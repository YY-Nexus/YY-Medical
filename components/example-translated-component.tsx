"use client"

import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ExampleTranslatedComponent() {
  const { t } = useTranslation()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t("patients.list")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{t("patients.details")}</p>
        <div className="flex gap-2">
          <Button>{t("common.add")}</Button>
          <Button variant="outline">{t("common.cancel")}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
