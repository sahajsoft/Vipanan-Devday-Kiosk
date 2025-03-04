interface HamburgerMenuItemProps {
  text: string;
  href: string;
  role: string;
}

export default function HamburgerMenuItem(props: HamburgerMenuItemProps) {
  return (
    <a
      href={props.href}
      role={props.role}
      className={`px-4 leading-9 font-medium text-black hover:text-white hover:bg-sahaj-purple rounded-lg transition`}
    >
      {props.text}
    </a>
  );
}