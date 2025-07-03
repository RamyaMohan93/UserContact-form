"use client"

import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitSignUp } from "@/app/actions/sign-up"
import { CheckCircle, AlertCircle, MapPin, Phone, Mail } from "lucide-react"

const initialState = null

const learningChallenges = [
  "Information Overload",
  "Difficulty Finding Relevant Content",
  "Struggling with Personalized Learning",
  "Slow Knowledge Absorption",
  "Inconsistent Skill Development",
  "Lack of Real-Time Feedback",
  "Gaps in Existing Knowledge",
  "Limited Time for Learning",
  "Overwhelmed by Complex Topics",
  "Fragmented Learning Resources",
  "Other: Please Specify",
]

const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+86", country: "CN" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+81", country: "JP" },
  { code: "+61", country: "AU" },
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transform transition hover:scale-105"
      disabled={pending}
    >
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(submitSignUp, initialState)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Be the first to experience <span className="text-pink-600">CortexCatalyst</span> and revolutionize your
              learning.
            </h2>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form action={formAction} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number
                  </Label>
                  <div className="flex gap-2">
                    <Select name="countryCode" defaultValue="+1">
                      <SelectTrigger className="w-32 border-gray-300 focus:border-pink-500">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((item) => (
                          <SelectItem key={item.code} value={item.code}>
                            {item.code} {item.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="flex-1 border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                {/* Learning Challenges */}
                <div className="space-y-4">
                  <Label className="text-gray-700 font-medium">
                    Why do you believe CortexCatalyst can address your knowledge and learning challenges?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learningChallenges.map((challenge, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`challenge-${index}`}
                          name="challenges"
                          value={challenge}
                          className="border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                        />
                        <Label htmlFor={`challenge-${index}`} className="text-sm text-gray-600 cursor-pointer">
                          {challenge}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stay in Loop */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stayInLoop"
                    name="stayInLoop"
                    value="yes"
                    className="border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                  />
                  <Label htmlFor="stayInLoop" className="text-sm text-gray-600 cursor-pointer">
                    <span className="text-pink-600 font-medium">Stay in Loop</span>
                    <br />
                    <span className="text-red-500">Yes, keep me updated on new features and platform updates!</span>
                  </Label>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700 font-medium">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Enter subject"
                    required
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                  />
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
                          {state.details && <div className="mt-1 text-sm">{state.details}</div>}
                        </>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Company Info */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="text-pink-600 font-semibold">CortexCatalyst</span> product of RKAI Techsolutions
                    Inc.,
                  </p>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-pink-500" />
                    <span>15 Lovell Dr, Plainsboro, NJ 08536, USA</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-pink-500" />
                    <span>+1 732-650-0403</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-pink-500" />
                    <span>info@cortexcatalyst.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Futuristic Sign Up Visual */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-800 to-gray-900 text-white overflow-hidden">
            <CardContent className="p-0 relative h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-pink-500/20"></div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">SIGN UP</h3>
                  <p className="text-sm text-gray-300">CORTEXCATALYST.AI</p>
                </div>
              </div>
              {/* Animated background elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
