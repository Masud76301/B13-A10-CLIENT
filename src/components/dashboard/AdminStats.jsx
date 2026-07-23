"use client";

import { BookOpen, Persons, Flag, CrownDiamond } from "@gravity-ui/icons";
import { FaRegFileAlt } from "react-icons/fa";




export default function AdminStats({user, recipes,premiumMembers,reports}) {
console.log("user is ", user);
  
  const stats = [
  {
    title: "Total Users",
    value: user?.length,
    icon: Persons,
  },
  {
    title: "Total Recipes",
    value: recipes,
    icon: BookOpen,
  },
  {
    title: "Total Premium Members",
    value: premiumMembers,
    icon: CrownDiamond,
  },
  {
    title: "Total Reports",
    value: reports.length,
    icon: Flag,
  },

];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 w-full">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-divider
              bg-surface
              p-7
              min-h-47
              transition-all
              duration-300
              hover:border-cyan-500/40
              hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]
            "
          >
       
            {/* Gradient Glow */}
            <div className="
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
                bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.15),transparent_55%)]
                "
            />

            <div className="relative z-10">
              {/* Icon Container */}
              <div
                className="
                  mb-8
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-default
                  border
                  border-divider
                "
              >
                <Icon className="text-xl text-foreground" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-base text-muted">
                  {item.title}
                </p>

                <h2 className="text-4xl font-semibold text-foreground tracking-tight">
                  {item.value}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}