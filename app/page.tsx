import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CortexCatalyst Sign-Up</h1>
        <p className="text-xl text-gray-600 mb-8">Revolutionize your learning experience</p>

        <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-pink-600">Get Started</CardTitle>
            <CardDescription>Join the future of personalized learning</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/sign-up">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 rounded-full">
                Sign Up Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
