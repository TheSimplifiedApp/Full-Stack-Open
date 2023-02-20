import { useEffect, useState } from "react"
import diagnoseService from "../../services/diagnoseService"
import { Diagnosis } from "../../types"

const Diagnose = ({code}: {code: string}) => {
  const [diagnose, setDiagnose] = useState<Diagnosis>()

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const diagnosis = await diagnoseService.getDiagnose(code);
      setDiagnose(diagnosis)
    };
    void fetchDiagnosis();
  }, [code])

  // console.log(diagnose)

  if (!diagnose) {
    return <li>{code}</li>
  }

  return (
    <li>{diagnose.code} {diagnose.name}</li>
  )
}

export default Diagnose