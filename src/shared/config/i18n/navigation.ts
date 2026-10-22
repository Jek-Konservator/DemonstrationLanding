import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Ссылки с учётом языка: <Link href="/" locale="en" /> ведёт на /en
export const { Link } = createNavigation(routing);
