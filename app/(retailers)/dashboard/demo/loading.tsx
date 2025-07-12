import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white shadow-xl">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-12 h-12 rounded-2xl bg-white/20" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-20 bg-white/20" />
                <Skeleton className="h-4 w-32 bg-white/20" />
              </div>
            </div>
            <Skeleton className="h-12 w-96 rounded-xl bg-white/10" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-lg bg-white/20" />
            <Skeleton className="h-10 w-10 rounded-lg bg-white/20" />
            <Skeleton className="h-10 w-32 rounded-lg bg-white/20" />
          </div>
        </div>

        <div className="flex">
          {/* Sidebar Skeleton */}
          <div className="w-72 bg-white/95 backdrop-blur-sm border-r border-slate-200 min-h-screen">
            <div className="p-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-10 w-80" />
                  <Skeleton className="h-6 w-96" />
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="space-y-8">
              <Skeleton className="h-12 w-80 rounded-lg" />

              {/* Key Metrics Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Skeleton className="w-14 h-14 rounded-2xl" />
                        <Skeleton className="w-5 h-5" />
                      </div>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-32" />
                        <div className="flex items-center space-x-2">
                          <Skeleton className="w-4 h-4" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-3 w-full rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-60" />
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-80 w-full rounded-lg" />
                  </CardContent>
                </Card>

                <Card className="shadow-xl">
                  <CardHeader>
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-48 w-full rounded-lg" />
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-5 w-12 rounded-full" />
                          </div>
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lists Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Array.from({ length: 2 }).map((_, cardIndex) => (
                  <Card key={cardIndex} className="shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center space-x-4">
                              <Skeleton className="w-12 h-12 rounded-full" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-40" />
                              </div>
                            </div>
                            <div className="space-y-2 text-right">
                              <Skeleton className="h-5 w-16" />
                              <Skeleton className="h-4 w-20" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
