import { supabase } from "@/lib/supabase"

export default async function TestConnectionPage() {
  let connectionStatus = "Unknown"
  let error = ""
  let tableExists = false
  const envVars = {
    url: "",
    key: "",
  }

  try {
    // Check environment variables
    envVars.url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "NOT SET"
    envVars.key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "NOT SET"

    // Test basic connection
    const { data, error: connError } = await supabase.from("contacts").select("count", { count: "exact", head: true })

    if (connError) {
      connectionStatus = "Failed"
      error = `${connError.message} (Code: ${connError.code})`
    } else {
      connectionStatus = "Connected"
      tableExists = true
    }
  } catch (e: any) {
    connectionStatus = "Error"
    error = e.message || "Unknown error"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>

          <div className="space-y-4">
            <div className="p-4 border rounded">
              <h2 className="font-semibold mb-2">Environment Variables</h2>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>SUPABASE_URL:</strong>
                  <span className={envVars.url === "NOT SET" ? "text-red-600" : "text-green-600"}>
                    {envVars.url === "NOT SET" ? " NOT SET" : " ✓ Set"}
                  </span>
                </div>
                <div>
                  <strong>SUPABASE_ANON_KEY:</strong>
                  <span className={envVars.key === "NOT SET" ? "text-red-600" : "text-green-600"}>
                    {envVars.key === "NOT SET" ? " NOT SET" : " ✓ Set"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded">
              <h2 className="font-semibold mb-2">Connection Status</h2>
              <div
                className={`text-lg font-medium ${
                  connectionStatus === "Connected" ? "text-green-600" : "text-red-600"
                }`}
              >
                {connectionStatus}
              </div>
              {error && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            <div className="p-4 border rounded">
              <h2 className="font-semibold mb-2">Contacts Table</h2>
              <div className={`text-lg font-medium ${tableExists ? "text-green-600" : "text-red-600"}`}>
                {tableExists ? "✓ Exists" : "✗ Not Found"}
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h2 className="font-semibold mb-2 text-blue-800">Next Steps</h2>
              <div className="text-sm text-blue-700 space-y-1">
                {envVars.url === "NOT SET" || envVars.key === "NOT SET" ? (
                  <p>• Add the Supabase integration to your project to automatically set environment variables</p>
                ) : null}
                {!tableExists ? <p>• Run the table creation SQL script in your Supabase dashboard</p> : null}
                {connectionStatus === "Connected" && tableExists ? (
                  <p>• Everything looks good! Your contact form should work.</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
