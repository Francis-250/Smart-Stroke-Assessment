"use client";

import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  MessageSquare,
  RefreshCw,
  Brain,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Risk = "HIGH" | "MEDIUM" | "LOW";

const cfg = {
  HIGH: {
    icon: AlertTriangle,
    iconColor: "text-red-500",
    label: "High risk",
    labelColor: "text-red-700",
    ring: "border-red-200 bg-red-50",
    badge: "bg-red-50 text-red-700 border-red-200",
    bar: "bg-red-500",
    rec: "Your symptoms indicate a high stroke risk. Call 911 or emergency services immediately. Do not drive yourself.",
  },
  MEDIUM: {
    icon: AlertCircle,
    iconColor: "text-amber-500",
    label: "Medium risk",
    labelColor: "text-amber-700",
    ring: "border-amber-200 bg-amber-50",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    bar: "bg-amber-400",
    rec: "Seek urgent medical attention today. Go to your nearest emergency room or call your doctor now.",
  },
  LOW: {
    icon: CheckCircle,
    iconColor: "text-green-600",
    label: "Low risk",
    labelColor: "text-green-700",
    ring: "border-green-200 bg-green-50",
    badge: "bg-green-50 text-green-700 border-green-200",
    bar: "bg-green-500",
    rec: "No major stroke indicators detected. Monitor your symptoms and consult a doctor within 48 hours if they persist.",
  },
};

const mock = {
  id: "1",
  date: "Jun 12, 2026",
  time: "10:32 AM",
  risk: "HIGH" as Risk,
  confidence: 91,
  fastScore: 2,
  symptoms: ["Facial drooping", "Arm weakness"],
  text: "My left arm feels very heavy and the left side of my face feels numb.",
  aiResponse: `Based on the symptoms you reported, I have identified 2 of the 4 FAST stroke indicators — facial drooping and arm weakness. Both are strong clinical markers of a cerebrovascular event.

Combined with your reported age and history of hypertension, this assessment indicates a high probability of an acute stroke. The asymmetric presentation of symptoms on one side of the body further supports this.

You should call emergency services immediately. Do not eat, drink, or take any medication before speaking to a doctor. Note the time your symptoms started — this is critical information for the medical team.`,
  doctor: {
    name: "Dr. A. Smith",
    specialty: "Neurologist",
    comment:
      "Patient shows two classic FAST indicators. I have flagged this for immediate review. If symptoms worsen before your appointment, call our emergency line directly.",
    date: "Jun 12, 2026 · 2:45 PM",
    urgent: true,
  },
};

export default function SingleAssessment() {
  const router = useRouter();
  const a = mock;
  const c = cfg[a.risk];
  const Icon = c.icon;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={15} /> Back
        </button>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-sm text-muted-foreground">
          Assessment #{a.id}
        </span>
        <span className="text-muted-foreground/40">/</span>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock size={12} /> {a.date} · {a.time}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — result card */}
        <div className="space-y-4">
          {/* Risk */}
          <div className="rounded-lg border p-5">
            <div
              className={cn(
                "w-14 h-14 rounded-full border-2 flex items-center justify-center mb-4",
                c.ring,
              )}
            >
              <Icon size={24} className={c.iconColor} />
            </div>
            <p className={cn("text-lg font-semibold", c.labelColor)}>
              {c.label}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 mb-4">
              Confidence: {a.confidence}%
            </p>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full", c.bar)}
                style={{ width: `${a.confidence}%` }}
              />
            </div>
          </div>

          {/* FAST score */}
          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              FAST score
            </p>
            <div className="flex gap-1.5 mb-2">
              {["F", "A", "S", "T"].map((l, i) => (
                <div
                  key={l}
                  className={cn(
                    "flex-1 h-8 rounded flex items-center justify-center text-xs font-bold",
                    i < a.fastScore
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {a.fastScore} of 4 indicators
            </p>
          </div>

          {/* Detected symptoms */}
          <div className="rounded-lg border p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Detected symptoms
            </p>
            <div className="flex flex-wrap gap-1.5">
              {a.symptoms.length > 0 ? (
                a.symptoms.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-muted px-2.5 py-1 rounded-sm font-medium"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">None flagged</p>
              )}
            </div>
            {a.text && (
              <>
                <Separator className="my-3" />
                <p className="text-[11px] text-muted-foreground mb-1">
                  Patient description
                </p>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &quot;{a.text}&quot;
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={() => router.push("/patient/assessment")}
            >
              <RefreshCw size={13} className="mr-2" /> New assessment
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              <ChevronLeft size={13} className="mr-1" /> Back
            </Button>
          </div>
        </div>

        {/* Right — details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recommendation */}
          <div
            className={cn(
              "rounded-lg border p-4",
              a.risk === "HIGH"
                ? "border-red-200 bg-red-50"
                : a.risk === "MEDIUM"
                  ? "border-amber-200 bg-amber-50"
                  : "border-green-200 bg-green-50",
            )}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Recommendation
            </p>
            <p className="text-sm leading-relaxed">{c.rec}</p>
          </div>

          {/* AI response */}
          <div className="rounded-lg border p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                <Brain size={13} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">AI assessment</p>
                <p className="text-xs text-muted-foreground">
                  Groq LLaMA 3.3 70B
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {a.aiResponse}
            </p>
          </div>

          {/* Doctor comment */}
          {a.doctor && (
            <div
              className={cn(
                "rounded-lg border p-5",
                a.doctor.urgent && "border-red-200",
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                    <MessageSquare
                      size={13}
                      className="text-muted-foreground"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{a.doctor.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.doctor.specialty}
                    </p>
                  </div>
                </div>
                {a.doctor.urgent && (
                  <Badge variant="destructive" className="text-[11px]">
                    Urgent
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {a.doctor.comment}
              </p>
              <p className="text-xs text-muted-foreground">{a.doctor.date}</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            This is not a medical diagnosis. Always consult a qualified
            healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
