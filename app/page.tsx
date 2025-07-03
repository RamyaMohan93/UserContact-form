import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Form</h1>
        <p className="text-xl text-gray-600 mb-8">A contact form that stores submissions in Supabase</p>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Fill out our contact form</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/contact">
              <Button className="w-full">Go to Contact Form</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
