"use client";

import { Table, Button, toast } from "@heroui/react";
import { FiEye, FiUserCheck, FiUserX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UsersTable({ users }) {
  // Action handlers for Block/Unblock buttons
  const handleBlockUser = (userId) => {
    // Implement your block logic / server actions here
    
    toast.danger(`Blocking user: ${userId}`);
  };

  const handleUnblockUser = (userId) => {
    // Implement your unblock logic / server actions here
    console.log("Unblocking user:", userId);
  };

  return (
    <Table aria-label="Manage Users Admin Table">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[900px]">
          <Table.Header>
            <Table.Column isRowHeader>User</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Plan</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Joined</Table.Column>
            <Table.Column>Action</Table.Column>
          </Table.Header>

          <Table.Body emptyContent={"No users found in the database."}>
            {users?.map((user) => {
              // Standardizes key formats safely for MongoDB format
              const userId = user._id?.$oid || user._id;
          

             // Format date string beautifully (Handles standard ISO string or Date object directly)
              const joinDate = user.createdAt 
                ? new Date(user.createdAt).toLocaleDateString('en-US', { year:      'numeric', month: 'short', day: 'numeric' })
                : "N/A";

              // Check user status based on a blocked condition (fallback to active if field isn't set yet)
              const isBlocked = user.status === "blocked"; 

              return (
                <Table.Row key={userId}>
                  {/* USER COLUMN (AVATAR + NAME & EMAIL) */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-full bg-default-100 border border-divider">
                        <Image
                          src={user.image || "https://cdn3d.iconscout.com/3d/premium/thumb/admin-3d-icon-png-download-8772657.png"}
                          alt={user.name || "User Avatar"}
                          fill
                          className="object-cover"
                          sizes="40px"
                          unoptimized 
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-foreground text-sm leading-tight">
                          {user.name || "Anonymous User"}
                        </p>
                        <p className="text-xs text-default-400 mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* ROLE COLUMN */}
                  <Table.Cell>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border uppercase ${
                      user.role === "admin" 
                        ? "text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/30" 
                        : "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/30"
                    }`}>
                      {user.role || "user"}
                    </span>
                  </Table.Cell>

                  {/* PLAN COLUMN */}
                  <Table.Cell>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border uppercase ${
                      user.plan === "pro" || user.plan === "premium"
                        ? "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/30" 
                        : "text-default-600 bg-default-100 border-default-200"
                    }`}>
                      {user.plan || "free"}
                    </span>
                  </Table.Cell>

                  {/* STATUS COLUMN */}
                  <Table.Cell>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      isBlocked 
                        ? "text-danger bg-danger-50 dark:bg-danger-950/30 border-danger-200" 
                        : "text-success bg-success-50 dark:bg-success-950/30 border-success-200"
                    }`}>
                      {isBlocked ? "Blocked" : "Active"}
                    </span>
                  </Table.Cell>

                  {/* JOIN DATE COLUMN */}
                  <Table.Cell>
                    <span className="text-sm text-default-500 font-medium">
                      {joinDate}
                    </span>
                  </Table.Cell>

                  {/* ACTION COLUMN */}
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      {/* VIEW ACTION */}
                      <Link href={`/dashboard/admin/manage-users/${userId}`}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="View User Details"
                          className="text-default-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all"
                        >
                          <FiEye className="size-4" />
                        </Button>
                      </Link>

                      {/* BLOCK / UNBLOCK ACTION */}
                      {isBlocked ? (
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="Unblock User"
                          onClick={() => handleUnblockUser(userId)}
                          className="text-success hover:bg-success-50 dark:hover:bg-success-950/30 transition-all"
                        >
                          <FiUserCheck className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          aria-label="Block User"
                          onClick={() => handleBlockUser(userId)}
                          className="text-danger hover:bg-danger-50 dark:hover:bg-danger-950/30 transition-all"
                        >
                          <FiUserX className="size-4" />
                        </Button>
                      )}
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