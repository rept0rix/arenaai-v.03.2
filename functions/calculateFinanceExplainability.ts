import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { 
            monthlyIncome, 
            monthlyExpenses, 
            propertyPrice, 
            downPayment 
        } = await req.json();

        // חישוב סכום הלוואה
        const loanAmount = propertyPrice - downPayment;
        
        // חישוב החזר חודשי משוער (ריבית 4%, 25 שנה)
        const monthlyInterestRate = 0.04 / 12;
        const numberOfPayments = 25 * 12;
        const monthlyPayment = loanAmount * 
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        // חישוב יחס החזר (DTI - Debt to Income)
        const dti = (monthlyPayment / monthlyIncome) * 100;
        
        // חישוב אחוז מימון (LTV - Loan to Value)
        const ltv = (loanAmount / propertyPrice) * 100;

        // קביעת סטטוס אישור
        let isApproved = true;
        let limitingFactor = null;
        let limitingFactorExplanation = '';
        let statusMessage = '';

        // בדיקת DTI (סף: 40%)
        if (dti > 40) {
            isApproved = false;
            limitingFactor = 'DTI';
            limitingFactorExplanation = `ההחזר החודשי המשוער מהווה כ-${Math.round(dti)}% מההכנסה שלך, גבוה מהסף המקובל של 40%.`;
        }
        // בדיקת LTV (סף: 75%)
        else if (ltv > 75) {
            isApproved = false;
            limitingFactor = 'LTV';
            limitingFactorExplanation = `אחוז המימון המבוקש הוא ${Math.round(ltv)}%, גבוה מהסף המקסימלי של 75%.`;
        }
        // אישור
        else {
            limitingFactor = 'DTI';
            limitingFactorExplanation = `ההחזר החודשי המשוער מהווה כ-${Math.round(dti)}% מההכנסה שלך, נמוך מהסף המקובל של 40%.`;
        }

        // הודעת סטטוס
        if (isApproved) {
            statusMessage = 'כל הכבוד. השלמת את בדיקת המימון בהצלחה. בכפוף לדירוג אשראי תקין, תוכל להתקדם לאפשרויות המימון המוצגות כאן.';
        } else {
            statusMessage = 'לפי הנתונים שמסרת, בנקים יטו שלא לאשר את הבקשה שלך למשכנתא.';
        }

        return Response.json({
            isApproved,
            statusMessage,
            limitingFactor,
            limitingFactorExplanation,
            calculatedData: {
                dti: Math.round(dti),
                ltv: Math.round(ltv),
                monthlyPayment: Math.round(monthlyPayment),
                loanAmount: Math.round(loanAmount)
            }
        });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});