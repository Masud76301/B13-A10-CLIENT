"use client";

import { Table, Button, Tooltip, toast } from "@heroui/react";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";
import React from "react";
import { deleteRecipe } from "@/lib/action/recipe";
import { useRouter } from "next/navigation";
import { dismissReport } from "@/lib/action/reports";

export default function ReportsTable({ reports }) {
    const router = useRouter();

    const handleRemoveRecipe = async (recipeId, reportId) => {
        try {
            const res = await deleteRecipe(recipeId);
            if (res?.deletedCount > 0 || res?.acknowledged) {
                toast.success(`Removing recipe: ${recipeId} and report: ${reportId}`)
                await dismissReport(reportId);
                router.refresh();
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleDismissReport = async (reportId) => {
        try {
            const res = await dismissReport(reportId);
            if (res?.deletedCount > 0 || res?.acknowledged) {
                toast.success(`Dismissing report: ${reportId}`)
                router.refresh();
            }
            console.log(`Dismissing report: ${reportId}`);
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Table aria-label="Recipe Reports Management Table" className="mt-4 shadow-sm border border-default-100 rounded-xl">
            <Table.ScrollContainer>
                <Table.Content className="min-w-[900px]">
                    <Table.Header>
                        <Table.Column width={110} isRowHeader>Recipe ID</Table.Column>
                        <Table.Column>User Mail</Table.Column>
                        <Table.Column>Reason</Table.Column>
                        <Table.Column>Comments</Table.Column>
                        <Table.Column>Reported Date</Table.Column>
                        <Table.Column align="end" width={160}>Actions</Table.Column>
                    </Table.Header>

                    <Table.Body emptyContent={"No recipe reports found."}>
                        {reports?.map((report) => {
                            const reportId = report._id?.$oid || report._id;
                            const rawDate = report.addedAt?.$date || report.addedAt;
                            const reportedDate = rawDate
                                ? new Date(rawDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                                : "N/A";

                            return (
                                <Table.Row key={reportId} className="border-b border-default-100 last:border-none hover:bg-default-50 transition-colors">
                                    {/* RECIPE ID WITH DOT-DOT-DOT TRUNCATION */}
                                    <Table.Cell>
                                        <Tooltip content="Double click to copy full ID" closeDelay={0}>
                                            <span className="font-mono text-xs bg-default-100 px-2 py-1 rounded text-default-700 block truncate max-w-[90px] cursor-pointer select-all">
                                                {report.recipeId}
                                            </span>
                                        </Tooltip>
                                    </Table.Cell>

                                    {/* USER MAIL */}
                                    <Table.Cell>
                                        <span className="text-sm font-medium text-foreground">
                                            {report.userMail}
                                        </span>
                                    </Table.Cell>

                                    {/* REASON */}
                                    <Table.Cell>
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full border text-danger bg-danger-50 dark:bg-danger-950/30 border-danger-200 whitespace-nowrap">
                                            {report.reason || "Unspecified"}
                                        </span>
                                    </Table.Cell>

                                    {/* COMMENTS - WRAPS TO EXACTLY TWO LINES MAX */}
                                    <Table.Cell>
                                        <div className="text-sm text-default-500 max-w-50 line-clamp-2 whitespace-normal wrap-break-word leading-relaxed">
                                            {report.comments || "No comments left."}
                                        </div>
                                    </Table.Cell>

                                    {/* REPORTED DATE */}
                                    <Table.Cell>
                                        <span className="text-sm text-default-400 font-medium">
                                            {reportedDate}
                                        </span>
                                    </Table.Cell>

                                    {/* ACTIONS - COMPACT MIXED LAYOUT FOR SPACE AND CLARITY */}
                                    <Table.Cell>
                                        <div className="flex flex-col sm:flex-row items-end sm:items-center  gap-1.5">
                                            {/* REMOVE BUTTON */}
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="danger"
                                                onClick={() => handleRemoveRecipe(report.recipeId, reportId)}
                                                className="text-[11px] hover:text-red-600 font-medium h-7 px-2.5 min-w-0"
                                            >
                                                <FiTrash2 className="size-3.5" />
                                                Remove
                                            </Button>

                                            {/* DISMISS BUTTON */}
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="success"
                                                onClick={() => handleDismissReport(reportId)}
                                                className="text-[11px] hover:text-yellow-500 font-medium h-7 px-2.5 min-w-0"
                                            >
                                                <FiCheckCircle className="size-3.5" />
                                                Dismiss
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}