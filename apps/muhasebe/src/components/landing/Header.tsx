"use client";

import type { FC, PropsWithChildren } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import type { Session } from "@acme/auth";

import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

interface MobileNavLinkProps {
  href: string;
}

const MobileNavLink: FC<PropsWithChildren<MobileNavLinkProps>> = ({
  href,
  children,
}) => {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
};

interface MobileNavIconProps {
  open: boolean;
}

const MobileNavIcon: FC<MobileNavIconProps> = ({ open }) => {
  return (
    <svg
      aria-hidden="true"
      className="stroke-slate-700 h-3.5 w-3.5 overflow-visible"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0",
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0",
        )}
      />
    </svg>
  );
};

interface MobileNavigationProps {
  session: Session | null;
}

const MobileNavigation: FC<MobileNavigationProps> = ({ session }) => {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="bg-slate-300/50 fixed inset-0" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="text-slate-900 ring-slate-900/5 absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight shadow-xl ring-1"
          >
            <MobileNavLink href="#features">Özellikler</MobileNavLink>
            <MobileNavLink href="#pricing">Fiyatlar</MobileNavLink>
            <hr className="border-slate-300/40 m-2" />
            {session?.user === undefined && (
              <MobileNavLink href="/auth/login">Giriş</MobileNavLink>
            )}
            {session?.user !== undefined && (
              <MobileNavLink href="/auth/login">Giriş</MobileNavLink>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
};

interface HeaderProps {
  session: Session | null;
}

export const Header: FC<HeaderProps> = ({ session }) => {
  // const { data: session, status } = useSession();
  if (session?.user === undefined)
    return (
      <header className="py-10">
        <Container>
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <Link href="#" aria-label="Home">
                <Logo />
              </Link>
              <div className="hidden md:flex md:gap-x-6">
                <NavLink href="#features">Özellikler</NavLink>
                <NavLink href="#pricing">Fiyatlar</NavLink>
              </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <div className="hidden md:block">
                <NavLink href="auth/login">Giriş</NavLink>
              </div>
              <ButtonLink href="auth/register" color="blue">
                <span>
                  <span className="hidden lg:inline">Şimdi</span> Hesap
                  Oluşturun
                </span>
              </ButtonLink>
              <div className="-mr-1 md:hidden">
                <MobileNavigation session={session} />
              </div>
            </div>
          </nav>
        </Container>
      </header>
    );
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Logo />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">Özellikler</NavLink>
              <NavLink href="#pricing">Fiyatlar</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <NavLink href="/auth/login">Giriş</NavLink>
            {session.user.image ? (
              <NavLink href="/auth/login">
                <Image
                  className="h-8 w-8 rounded-full bg-gray-50"
                  // TODO: add default user image
                  src={session.user.image}
                  alt="profile picture"
                  width={32}
                  height={32}
                />
              </NavLink>
            ) : null}

            <div className="-mr-1 md:hidden">
              <MobileNavigation session={session} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};
