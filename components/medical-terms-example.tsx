"use client"

import { useMedicalTerms } from "@/hooks/use-medical-terms"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MedicalTermsExample() {
  const { t } = useTranslation()
  const { mt } = useMedicalTerms()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t("patients.medical_records")}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-2">{t("common.diagnosis")}</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>{mt("diagnosis.diabetes")}</li>
          <li>{mt("diagnosis.hypertension")}</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">{t("common.symptoms")}</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>{mt("symptom.fatigue")}</li>
          <li>{mt("symptom.headache")}</li>
          <li>{mt("symptom.dizziness")}</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">{t("common.treatment")}</h3>
        <ul className="list-disc pl-5">
          <li>{mt("medication.antihypertensive")}</li>
          <li>{mt("medication.antidiabetic")}</li>
        </ul>
      </CardContent>
    </Card>
  )
}
