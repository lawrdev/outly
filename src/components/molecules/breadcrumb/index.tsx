import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { VscChevronRight } from "react-icons/vsc";

interface CrumbProp {
  title: string;
  href: string;
  isCurrent: boolean;
}
interface Props {
  crumbs: CrumbProp[];
}
export function Breadcrumbs({ crumbs }: Props) {
  return (
    <Breadcrumb
      spacing="8px"
      separator={<VscChevronRight color="gray.500" />}
      fontSize="xs"
      fontWeight="medium"
    >
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index} isCurrentPage={crumb.isCurrent}>
          {crumb.isCurrent ? (
            <BreadcrumbLink>{crumb.title}</BreadcrumbLink>
          ) : (
            <BreadcrumbLink as={Link} href={crumb.href}>
              {crumb.title}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
