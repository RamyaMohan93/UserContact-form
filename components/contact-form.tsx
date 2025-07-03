"use client"

import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitContact } from "@/app/actions/contact"
import { CheckCircle, AlertCircle } from "lucide-react"

const initialState = null

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Send Message"}
    </Button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input id="firstName" name="firstName" type="text" placeholder="Enter your first name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input id="lastName" name="lastName" type="text" placeholder="Enter your last name" required />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input id="email" name="email" type="email" placeholder="Enter your email address" required />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="Enter your phone number" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea id="message" name="message" placeholder="Enter your message" className="min-h-[120px]" required />
          </div>

          {/* Result */}
          {state && (
            <Alert className={state.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {state.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={state.success ? "text-green-800" : "text-red-800"}>
                {state.success ? (
                  state.message
                ) : (
                  <>
                    <strong>{state.error}</strong>
                    {state.details && <div className="mt-1">{state.details}</div>}
                    {state.hint && <div className="mt-1 italic text-gray-500">{state.hint}</div>}
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
