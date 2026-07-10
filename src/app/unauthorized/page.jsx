"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "@heroui/react";
// Using react-icons (ShieldAlert) and Gravity-like icons (ArrowLeft)
import { FiShieldOff } from "react-icons/fi"; 
import { LuArrowLeft, LuHome } from "react-icons/lu";
import { HiHome } from "react-icons/hi2";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 selection:bg-danger/20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <Card className="max-w-md w-full border-none bg-background/60 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-danger via-warning to-danger" />
        
        <div className="flex flex-col items-center text-center p-8 sm:p-12">
          {/* Icon Wrapper */}
          <div className="mb-6 p-4 rounded-full bg-danger/10 text-danger animate-pulse">
            <FiShieldOff size={48} className="stroke-[1.5]" />
          </div>

          {/* Error Code & Heading */}
          <span className="text-xs font-semibold tracking-widest text-danger uppercase mb-2">
            Error 403
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-foreground">
            Access Denied
          </h1>
          
          <p className="text-default-500 text-sm sm:text-base mb-8 max-w-[320px]">
            You do not have permission to access this page. It looks like your account role does not match the required privileges.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Button
              variant="bordered"
              color="default"
              radius="md"
              startContent={<LuArrowLeft size={18} />}
              onClick={() => router.back()}
              className="font-medium"
            >
              Go Back
            </Button>
            
            <Button
              color="danger"
              variant="solid"
              radius="md"
              
              onClick={() => router.push("/")}
              className="font-medium shadow-lg shadow-danger/20"
            >
              <HiHome/>
              Back to Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}