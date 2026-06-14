"use client";

import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  MessageSquare,
  CheckCircle,
  Info,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type NotifType =
  | "HIGH_RISK_ALERT"
  | "DOCTOR_COMMENT"
  | "ASSESSMENT_RESULT"
  | "SYSTEM";
type NotifStatus = "UNREAD" | "READ";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  date: string;
  status: NotifStatus;
  assessmentId?: string;
}

const mock: Notification[] = [
  {
    id: "1",
    type: "HIGH_RISK_ALERT",
    title: "High risk detected",
    message:
      "Your Jun 12 assessment flagged HIGH stroke risk. Please seek emergency medical attention immediately.",
    date: "Jun 12, 2026 · 10:33 AM",
    status: "UNREAD",
    assessmentId: "1",
  },
  {
    id: "2",
    type: "DOCTOR_COMMENT",
    title: "Dr. A. Smith left a note",
    message:
      "I have reviewed your assessment and flagged it as urgent. Please call our emergency line if symptoms worsen.",
    date: "Jun 12, 2026 · 2:45 PM",
    status: "UNREAD",
    assessmentId: "1",
  },
  {
    id: "3",
    type: "ASSESSMENT_RESULT",
    title: "Assessment complete",
    message:
      "Your Jun 8 assessment has been processed. Result: Medium risk. Confidence score: 74%.",
    date: "Jun 8, 2026 · 3:16 PM",
    status: "READ",
    assessmentId: "2",
  },
  {
    id: "4",
    type: "ASSESSMENT_RESULT",
    title: "Assessment complete",
    message:
      "Your May 30 assessment has been processed. Result: Low risk. Confidence score: 88%.",
    date: "May 30, 2026 · 9:01 AM",
    status: "READ",
    assessmentId: "3",
  },
  {
    id: "5",
    type: "SYSTEM",
    title: "Welcome to StrokeCheck",
    message:
      "Your account is active. Start your first symptom assessment anytime from the Assessment tab.",
    date: "May 20, 2026 · 8:00 AM",
    status: "READ",
  },
];

const typeConfig: Record<
  NotifType,
  { icon: React.ElementType; iconClass: string; borderClass: string }
> = {
  HIGH_RISK_ALERT: {
    icon: AlertTriangle,
    iconClass: "text-red-500",
    borderClass: "border-red-200",
  },
  DOCTOR_COMMENT: {
    icon: MessageSquare,
    iconClass: "text-blue-500",
    borderClass: "border-border",
  },
  ASSESSMENT_RESULT: {
    icon: CheckCircle,
    iconClass: "text-green-600",
    borderClass: "border-border",
  },
  SYSTEM: {
    icon: Info,
    iconClass: "text-muted-foreground",
    borderClass: "border-border",
  },
};

export default function Alerts() {
  const [notifications, setNotifications] = useState<Notification[]>(mock);
  const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

  const unreadCount = notifications.filter((n) => n.status === "UNREAD").length;

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "READ" } : n)),
    );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "READ" })));

  const filtered =
    filter === "UNREAD"
      ? notifications.filter((n) => n.status === "UNREAD")
      : notifications;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Notifications</p>
          <h1 className="text-2xl font-semibold tracking-tight">Alerts</h1>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={markAllRead}
          >
            <Check size={13} className="mr-1.5" /> Mark all read
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar — filters + summary */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Filter
            </p>
            <div className="flex flex-col gap-1">
              {(["ALL", "UNREAD"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors text-left",
                    filter === f
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )}
                >
                  <span>
                    {f === "ALL" ? "All notifications" : "Unread only"}
                  </span>
                  {f === "UNREAD" && unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="text-[10px] h-4 px-1.5"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                  {f === "ALL" && (
                    <span className="text-xs text-muted-foreground">
                      {notifications.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Type legend */}
          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Types
            </p>
            <div className="space-y-2.5">
              {[
                { type: "HIGH_RISK_ALERT", label: "Risk alerts" },
                { type: "DOCTOR_COMMENT", label: "Doctor notes" },
                { type: "ASSESSMENT_RESULT", label: "Results" },
                { type: "SYSTEM", label: "System" },
              ].map(({ type, label }) => {
                const { icon: Icon, iconClass } = typeConfig[type as NotifType];
                return (
                  <div key={type} className="flex items-center gap-2.5">
                    <Icon size={13} className={iconClass} />
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main — notification list */}
        <div className="lg:col-span-2">
          {filtered.length === 0 ? (
            <div className="rounded-lg border flex flex-col items-center justify-center py-16 text-center">
              <Bell size={24} className="text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No notifications
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                You&apos;re all caught up
              </p>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden divide-y">
              {filtered.map((n) => {
                const {
                  icon: Icon,
                  iconClass,
                  borderClass,
                } = typeConfig[n.type];
                const unread = n.status === "UNREAD";
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "flex items-start gap-4 px-5 py-4 transition-colors",
                      unread ? "bg-muted/30" : "bg-background",
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                        unread ? borderClass : "border-border bg-muted/40",
                      )}
                    >
                      <Icon
                        size={14}
                        className={unread ? iconClass : "text-muted-foreground"}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <p
                          className={cn(
                            "text-sm",
                            unread
                              ? "font-semibold"
                              : "font-medium text-muted-foreground",
                          )}
                        >
                          {n.title}
                        </p>
                        {unread && (
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        {n.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-muted-foreground/60">
                          {n.date}
                        </p>
                        <div className="flex items-center gap-2">
                          {n.assessmentId && (
                            <a
                              href={`/patient/assessment/${n.assessmentId}`}
                              className="text-[11px] text-primary underline underline-offset-2 font-medium"
                            >
                              View assessment
                            </a>
                          )}
                          {unread && (
                            <button
                              onClick={() => markRead(n.id)}
                              className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
