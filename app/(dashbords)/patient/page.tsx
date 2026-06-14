"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { ChevronRight, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const assessments = [
  {
    id: "1",
    date: "Jun 12, 2026",
    time: "10:32 AM",
    risk: "HIGH" as const,
    confidence: 91,
    symptoms: ["Facial drooping", "Arm weakness"],
  },
  {
    id: "2",
    date: "Jun 8, 2026",
    time: "3:15 PM",
    risk: "MEDIUM" as const,
    confidence: 74,
    symptoms: ["Dizziness", "Numbness"],
  },
  {
    id: "3",
    date: "May 30, 2026",
    time: "9:00 AM",
    risk: "LOW" as const,
    confidence: 88,
    symptoms: [],
  },
];

const riskBadge = {
  HIGH: "bg-red-50 text-red-700 border-red-200",
  MEDIUM: "bg-amber-50 text-amber-700 border-amber-200",
  LOW: "bg-green-50 text-green-700 border-green-200",
};

const riskDot = {
  HIGH: "bg-red-500",
  MEDIUM: "bg-amber-400",
  LOW: "bg-green-500",
};

export default function PatientDashboard() {
  const router = useRouter();
  const { session, isLoading } = useSession();

  if (isLoading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-5 w-5 rounded-full border-2 border-muted border-t-foreground animate-spin" />
      </div>
    );

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  const name = session.user.name?.split(" ")[0] ?? "there";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Patient portal</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Hello, {name}
          </h1>
        </div>
        <Button onClick={() => router.push("/patient/assessment")} size="sm">
          New assessment <ArrowRight size={14} className="ml-1.5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Alert card */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800 mb-1">
              Unreviewed high-risk result
            </p>
            <p className="text-xs text-red-600 leading-relaxed">
              Your Jun 12 assessment was flagged high risk. Please seek medical
              attention or contact your doctor.
            </p>
            <button
              onClick={() => router.push("/patient/assessment/1")}
              className="mt-3 text-xs font-medium text-red-700 underline underline-offset-2"
            >
              View result →
            </button>
          </div>

          {/* FAST guide */}
          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              FAST method
            </p>
            <div className="space-y-3">
              {[
                { l: "F", title: "Face", body: "Is one side drooping?" },
                { l: "A", title: "Arms", body: "Can you raise both equally?" },
                { l: "S", title: "Speech", body: "Is speech slurred?" },
                { l: "T", title: "Time", body: "Call 911 immediately" },
              ].map(({ l, title, body }) => (
                <div key={l} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                    {l}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-lg border p-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-semibold">3</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Total</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-red-600">1</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                High risk
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold">84%</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Avg conf.
              </p>
            </div>
          </div>
        </div>

        {/* Right — history table */}
        <div className="lg:col-span-2 rounded-lg border overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <p className="text-sm font-medium">Assessment history</p>
            <button className="text-xs text-muted-foreground hover:text-foreground">
              View all
            </button>
          </div>

          {/* Table head — desktop */}
          <div className="hidden sm:grid grid-cols-12 px-4 py-2 border-b bg-muted/40 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            <span className="col-span-3">Date</span>
            <span className="col-span-4">Symptoms</span>
            <span className="col-span-2">Confidence</span>
            <span className="col-span-3 text-right">Risk</span>
          </div>

          {assessments.map((a) => (
            <button
              key={a.id}
              onClick={() => router.push(`/patient/assessment/${a.id}`)}
              className="w-full grid grid-cols-12 items-center px-4 py-3.5 border-b last:border-0 hover:bg-muted/30 transition-colors text-left group"
            >
              <div className="col-span-3">
                <p className="text-sm font-medium">{a.date}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock size={10} /> {a.time}
                </p>
              </div>
              <div className="col-span-4 flex flex-wrap gap-1">
                {a.symptoms.length > 0 ? (
                  a.symptoms.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="text-[11px] bg-muted px-2 py-0.5 rounded-sm text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full", riskDot[a.risk])}
                      style={{ width: `${a.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">
                    {a.confidence}%
                  </span>
                </div>
              </div>
              <div className="col-span-3 flex items-center justify-end gap-2">
                <span
                  className={cn(
                    "text-[11px] font-medium px-2 py-0.5 rounded border",
                    riskBadge[a.risk],
                  )}
                >
                  {a.risk.charAt(0) + a.risk.slice(1).toLowerCase()}
                </span>
                <ChevronRight
                  size={13}
                  className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
