import { Stack } from "@chakra-ui/react"
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

export const SidebarNav: React.FC = () => {
  return (
    <Stack spacing="12" algin="flex-start">
        <NavSection title="GERAL">
          <NavLink href="/dashboard" icon={RiDashboardLine}>DashBoard</NavLink>
          <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink>
        </NavSection>

        <NavSection title="AUTOMAÇÃO">
          <NavLink href="/form" icon={RiInputMethodLine}>Formulários</NavLink>
          <NavLink href="/automation" icon={RiGitMergeLine}>Automação</NavLink>
        </NavSection>
      </Stack>
  )
}