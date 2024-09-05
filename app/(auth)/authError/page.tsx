import CheckCard from "@/components/custom_ui/auth/CheckCard"
import { ShieldAlert } from "lucide-react"

export default function AuthErrorPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const error = searchParams.error;
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <CheckCard 
      title="There some thing wrong"
      message={error}
      link="/login"
      linkDisplay={"Login"}
      error={error}
      />
    </section>
  )
}
