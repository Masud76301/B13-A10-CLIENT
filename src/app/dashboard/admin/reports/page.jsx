import { getRecipeReports } from '@/lib/action/reports';
import React from 'react';
import ReportsTable from './ReportsTable';

const RecipeReportPage = async () => {
    const reports = await getRecipeReports() || [];

    return (
        <div className="p-6 max-w-[1400px] mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-default-100 pb-5 gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            Recipe Reports
                        </h1>
                        {reports.length > 0 && (
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-danger-50 text-danger dark:bg-danger-950/40 border border-danger-200">
                                {reports.length} Active
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-default-500 mt-1">
                        Review, manage, and act on user reports regarding copyrighted or inappropriate recipe submissions.
                    </p>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-background">
                <ReportsTable reports={reports} />
            </div>
        </div>
    );
};

export default RecipeReportPage;