import { getTransactions } from "@/lib/api/transaction";
import { stripe } from "@/lib/stripe";
import TransactionTable from "./TransactionTable";
import { FiDollarSign } from "react-icons/fi";

const TransactionPage = async () => {
    const transactions = await getTransactions() || [];

    const rawTransactionDetails = await Promise.all(
        transactions.map(async (transaction) => {
            if (!transaction.sessionId) return null;

            try {
                const session = await stripe.checkout.sessions.retrieve(
                    transaction.sessionId
                );

                return {
                    user: transaction.userEmail,
                    amount: session.amount_total / 100,
                    date: new Date(session.created * 1000),
                    paymentStatus: session.payment_status,
                    transactionId: session.id,
                    mode: transaction.mode,
                };
            } catch (error) {
                console.error(`Error retrieving Stripe session ${transaction.sessionId}:`, error);
                return null;
            }
        })
    );

    // Clean up null items so empty indices don't cause render problems inside the table
    const transactionDetails = rawTransactionDetails.filter(Boolean);

    // Dynamic metrics calculation for the header overview badge
    const totalTransactions = transactionDetails.length;

    return (
        <div className="max-w-300 mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Dashboard Header Container */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-default-100">
                <div className="flex items-center gap-3">
                    {/* Visual Vector Accent Icon */}
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-500">
                        <FiDollarSign className="size-6" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            Transaction Management
                        </h1>
                        <p className="text-xs sm:text-sm text-default-400 mt-0.5">
                            Monitor user billing checkouts, amounts, and live payment tracking statuses.
                        </p>
                    </div>
                </div>

                {/* Interactive Dynamic Counter Pill */}
                <div className="flex items-center gap-2 self-start sm:self-center bg-default-100 px-3 py-1.5 rounded-full border border-default-200">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-default-700">
                        Total: {totalTransactions} {totalTransactions === 1 ? 'Record' : 'Records'}
                    </span>
                </div>
            </div>

            {/* Main Table Interface Layout */}
            <div className="mt-4">
                <TransactionTable transaction={transactionDetails} />
            </div>
        </div>
    );
};

export default TransactionPage;