"use client";

import { Table, Tooltip, Chip } from "@heroui/react";
import React from "react";

export default function TransactionTable({ transaction }) {
    // Note: The parent component passes this data down as a prop named "transaction"
    const transactionsList = transaction || [];

    return (
        <Table 
            aria-label="User Financial Transactions Management Table" 
            className="mt-6 shadow-sm border border-default-100 rounded-xl"
        >
            <Table.ScrollContainer>
                <Table.Content className="min-w-[950px]">
                    <Table.Header>
                        <Table.Column width={130} isRowHeader>Transaction ID</Table.Column>
                        <Table.Column>User Email</Table.Column>
                        <Table.Column>Purchase Mode</Table.Column>
                        <Table.Column>Amount Paid</Table.Column>
                        <Table.Column>Payment Status</Table.Column>
                        <Table.Column align="end">Date</Table.Column>
                    </Table.Header>

                    <Table.Body emptyContent={"No transactions found."}>
                        {transactionsList.map((tx, index) => {
                            if (!tx) return null;

                            // Unique identifier key fallback
                            const txKey = tx.transactionId || `tx-index-${index}`;

                            // Formatted JavaScript Date parsing from Parent session
                            const formattedDate = tx.date
                                ? new Date(tx.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })
                                : "N/A";

                            return (
                                <Table.Row 
                                    key={txKey} 
                                    className="border-b border-default-100 last:border-none hover:bg-default-50 transition-colors"
                                >
                                    {/* TRANSACTION ID WITH COPY TRUNCATION */}
                                    <Table.Cell>
                                        <Tooltip content="Double click to copy full Session ID" closeDelay={0}>
                                            <span className="font-mono text-xs bg-default-100 px-2 py-1 rounded text-default-700 block truncate max-w-[110px] cursor-pointer select-all">
                                                {tx.transactionId}
                                            </span>
                                        </Tooltip>
                                    </Table.Cell>

                                    {/* USER EMAIL */}
                                    <Table.Cell>
                                        <span className="text-sm font-medium text-foreground">
                                            {tx.user || "Unknown User"}
                                        </span>
                                    </Table.Cell>

                                    {/* PURCHASE MODE */}
                                    <Table.Cell>
                                        <span className="text-xs capitalize font-medium text-default-600 px-2 py-0.5 rounded bg-default-100">
                                            {tx.mode || "Standard"}
                                        </span>
                                    </Table.Cell>

                                    {/* AMOUNT PAID */}
                                    <Table.Cell>
                                        <span className="text-sm font-semibold text-foreground">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(tx.amount || 0)}
                                        </span>
                                    </Table.Cell>

                                    {/* PAYMENT STATUS CHIP */}
                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={
                                                tx.paymentStatus === "paid" 
                                                    ? "success" 
                                                    : tx.paymentStatus === "unpaid" 
                                                    ? "warning" 
                                                    : "danger"
                                            }
                                            className="capitalize font-semibold text-xs border border-transparent"
                                        >
                                            {tx.paymentStatus || "Unknown"}
                                        </Chip>
                                    </Table.Cell>

                                    {/* DATE */}
                                    <Table.Cell align="end">
                                        <span className="text-sm text-default-400 font-medium">
                                            {formattedDate}
                                        </span>
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