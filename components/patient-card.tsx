"use client"

import { useTranslation } from "@/hooks/use-translation"
import { useMedicalTerms } from "@/hooks/use-medical-terms"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"

interface PatientCardProps {
  id: string
  name: string
  age: number
  gender: "male" | "female" | "other"
  diagnosis: string[]
  lastVisit: string | Date
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function PatientCard({
  id,
  name,
  age,
  gender,
  diagnosis,
  lastVisit,
  onView,
  onEdit,
  onDelete,
}: PatientCardProps) {
  const { t, formatDate } = useTranslation()
  const { mt } = useMedicalTerms()

  // 翻译性别
  const translateGender = (gender: string) => {
    switch (gender) {
      case "male":
        return t("patients.gender_male")
      case "female":
        return t("patients.gender_female")
      default:
        return t("patients.gender_other")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-medium">{t("patients.age")}:</span> {age}
          </p>
          <p>
            <span className="font-medium">{t("patients.gender")}:</span> {translateGender(gender)}
          </p>
          <p>
            <span className="font-medium">{t("patients.diagnosis")}:</span>{" "}
            {diagnosis.map((d, i) => (
              <span key={i}>
                {i > 0 && ", "}
                {mt(`diagnosis.${d}` as any) || d}
              </span>
            ))}
          </p>
          <p>
            <span className="font-medium">{t("patients.last_visit")}:</span> {formatDate(lastVisit)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {onView && (
          <Button variant="outline" size="sm" onClick={() => onView(id)}>
            <Eye className="mr-2 h-4 w-4" />
            {t("common.view")}
          </Button>
        )}
        {onEdit && (
          <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
            <Edit className="mr-2 h-4 w-4" />
            {t("common.edit")}
          </Button>
        )}
        {onDelete && (
          <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t("common.delete")}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
