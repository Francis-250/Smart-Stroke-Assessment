"use client";

import { useState } from "react";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Shield,
  Clock,
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// ── mock data — replace with real server action ──────────────────
const mockUser = {
  id: "usr_1",
  name: "John Doe",
  email: "john@example.com",
  emailVerified: true,
  image: null,
  phoneNumber: "+1 555 000 1234",
  phoneNumberVerified: false,
  username: "johndoe",
  displayUsername: "John D.",
  twoFactorEnabled: false,
  createdAt: "May 20, 2026",
  role: "PATIENT",
  banned: false,
};

const mockPatient = {
  age: 45,
  gender: "Male",
  bloodType: "O+",
  allergies: "Penicillin",
  existingConditions: "Migraines",
  smokingStatus: false,
  diabetic: false,
  hypertension: true,
  heartDisease: false,
};

// ── small helpers ────────────────────────────────────────────────
function VerifiedBadge({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="flex items-center gap-1 text-[11px] text-green-600">
      <CheckCircle size={11} /> Verified
    </span>
  ) : (
    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
      <XCircle size={11} /> Not verified
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
      {children}
    </p>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b last:border-0">
      <p className="text-xs text-muted-foreground w-36 flex-shrink-0">
        {label}
      </p>
      <p className="text-sm text-right">
        {value || <span className="text-muted-foreground/50">—</span>}
      </p>
    </div>
  );
}

function RiskFlag({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2.5 rounded-md border text-sm",
        active ? "border-amber-200 bg-amber-50" : "border-border bg-background",
      )}
    >
      <span className={active ? "text-amber-800" : "text-muted-foreground"}>
        {label}
      </span>
      {active ? (
        <AlertTriangle size={13} className="text-amber-500" />
      ) : (
        <CheckCircle size={13} className="text-muted-foreground/30" />
      )}
    </div>
  );
}

// ── main component ───────────────────────────────────────────────
export default function PatientProfile() {
  const router = useRouter();
  const { session, isLoading } = useSession();

  const [editingAccount, setEditingAccount] = useState(false);
  const [editingMedical, setEditingMedical] = useState(false);

  // account form state
  const [account, setAccount] = useState({
    name: mockUser.name,
    displayUsername: mockUser.displayUsername ?? "",
    phoneNumber: mockUser.phoneNumber ?? "",
  });

  // medical form state
  const [medical, setMedical] = useState(mockPatient);

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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs text-muted-foreground mb-1">Settings</p>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ── Left sidebar ── */}
        <div className="space-y-4 lg:sticky lg:top-[3.5rem]">
          {/* Avatar + name */}
          <div className="rounded-lg border p-5 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold mb-3">
              {mockUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <p className="text-sm font-semibold">{mockUser.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              @{mockUser.username}
            </p>
            <Badge variant="secondary" className="mt-2 text-[11px]">
              {mockUser.role}
            </Badge>
            {mockUser.banned && (
              <Badge variant="destructive" className="mt-1 text-[11px]">
                Banned
              </Badge>
            )}
          </div>

          {/* Account summary */}
          <div className="rounded-lg border p-4 space-y-0">
            <SectionTitle>Account</SectionTitle>
            <InfoRow label="Member since" value={mockUser.createdAt} />
            <InfoRow label="Email" value={mockUser.email} />
            <InfoRow label="Phone" value={mockUser.phoneNumber} />
            <InfoRow label="Username" value={`@${mockUser.username}`} />
          </div>

          {/* Verification status */}
          <div className="rounded-lg border p-4">
            <SectionTitle>Verification</SectionTitle>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail size={13} /> Email
                </div>
                <VerifiedBadge ok={mockUser.emailVerified} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone size={13} /> Phone
                </div>
                <VerifiedBadge ok={mockUser.phoneNumberVerified ?? false} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield size={13} /> 2FA
                </div>
                <VerifiedBadge ok={mockUser.twoFactorEnabled ?? false} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right — editable sections ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Account info */}
          <div className="rounded-lg border p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Account information</SectionTitle>
              {!editingAccount ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setEditingAccount(true)}
                >
                  <Edit2 size={12} className="mr-1.5" /> Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setEditingAccount(false)}
                  >
                    <Save size={12} className="mr-1.5" /> Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setEditingAccount(false)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Full name</Label>
                <Input
                  value={account.name}
                  onChange={(e) =>
                    setAccount({ ...account, name: e.target.value })
                  }
                  disabled={!editingAccount}
                  className="text-sm h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Display name</Label>
                <Input
                  value={account.displayUsername}
                  onChange={(e) =>
                    setAccount({ ...account, displayUsername: e.target.value })
                  }
                  disabled={!editingAccount}
                  className="text-sm h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input
                  value={mockUser.email}
                  disabled
                  className="text-sm h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone number</Label>
                <Input
                  value={account.phoneNumber}
                  onChange={(e) =>
                    setAccount({ ...account, phoneNumber: e.target.value })
                  }
                  disabled={!editingAccount}
                  className="text-sm h-9"
                />
              </div>
            </div>
          </div>

          {/* Medical profile */}
          <div className="rounded-lg border p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Medical profile</SectionTitle>
              {!editingMedical ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setEditingMedical(true)}
                >
                  <Edit2 size={12} className="mr-1.5" /> Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setEditingMedical(false)}
                  >
                    <Save size={12} className="mr-1.5" /> Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setEditingMedical(false)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="space-y-1.5">
                <Label className="text-xs">Age</Label>
                <Input
                  type="number"
                  value={medical.age ?? ""}
                  onChange={(e) =>
                    setMedical({ ...medical, age: Number(e.target.value) })
                  }
                  disabled={!editingMedical}
                  className="text-sm h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Gender</Label>
                <Select
                  value={medical.gender ?? ""}
                  onValueChange={(v) => setMedical({ ...medical, gender: v })}
                  disabled={!editingMedical}
                >
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Blood type</Label>
                <Select
                  value={medical.bloodType ?? ""}
                  onValueChange={(v) =>
                    setMedical({ ...medical, bloodType: v })
                  }
                  disabled={!editingMedical}
                >
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Allergies</Label>
                <Input
                  value={medical.allergies ?? ""}
                  onChange={(e) =>
                    setMedical({ ...medical, allergies: e.target.value })
                  }
                  disabled={!editingMedical}
                  placeholder="e.g. Penicillin"
                  className="text-sm h-9"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs">Existing conditions</Label>
                <Input
                  value={medical.existingConditions ?? ""}
                  onChange={(e) =>
                    setMedical({
                      ...medical,
                      existingConditions: e.target.value,
                    })
                  }
                  disabled={!editingMedical}
                  placeholder="e.g. Migraines, Asthma"
                  className="text-sm h-9"
                />
              </div>
            </div>

            <Separator className="mb-5" />

            {/* Risk factors */}
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Risk factors
            </p>
            {editingMedical ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: "smokingStatus", label: "Smoking" },
                  { key: "diabetic", label: "Diabetic" },
                  { key: "hypertension", label: "Hypertension" },
                  { key: "heartDisease", label: "Heart disease" },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-md border px-3 py-2.5"
                  >
                    <Label className="text-sm cursor-pointer">{label}</Label>
                    <Switch
                      checked={medical[key as keyof typeof medical] as boolean}
                      onCheckedChange={(v) =>
                        setMedical({ ...medical, [key]: v })
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <RiskFlag
                  label="Smoking"
                  active={medical.smokingStatus ?? false}
                />
                <RiskFlag label="Diabetic" active={medical.diabetic ?? false} />
                <RiskFlag
                  label="Hypertension"
                  active={medical.hypertension ?? false}
                />
                <RiskFlag
                  label="Heart disease"
                  active={medical.heartDisease ?? false}
                />
              </div>
            )}
          </div>

          {/* Security */}
          <div className="rounded-lg border p-5">
            <SectionTitle>Security</SectionTitle>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    Two-factor authentication
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {mockUser.twoFactorEnabled
                      ? "2FA is enabled on your account"
                      : "Add an extra layer of security"}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  {mockUser.twoFactorEnabled ? "Disable" : "Enable"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Password</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Change your account password
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <Lock size={12} className="mr-1.5" /> Change
                </Button>
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div className="rounded-lg border p-5">
            <SectionTitle>Active sessions</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  device: "Chrome on macOS",
                  ip: "102.22.4.1",
                  time: "Now — current session",
                  current: true,
                },
                {
                  device: "Safari on iPhone",
                  ip: "102.22.4.3",
                  time: "Jun 12, 2026 · 8:14 AM",
                  current: false,
                },
              ].map(({ device, ip, time, current }) => (
                <div key={device} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                      <Clock size={12} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium flex items-center gap-2">
                        {device}
                        {current && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] h-4 px-1.5"
                          >
                            Current
                          </Badge>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {ip} · {time}
                      </p>
                    </div>
                  </div>
                  {!current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 text-destructive hover:text-destructive"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-lg border border-destructive/30 p-5">
            <SectionTitle>Danger zone</SectionTitle>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Delete account</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm" className="text-xs h-8">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
