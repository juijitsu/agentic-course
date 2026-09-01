"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NAV } from "@/content/system";
import { cn } from "@/lib/utils";

/** Sticky top chrome: a hairline bar that stays out of the way while reading. */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-5">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground"
          >
            20
          </span>
          <span className="hidden sm:inline">Агент за двадцать дней</span>
          <span className="sm:hidden">Агент</span>
        </a>

        <NavigationMenu viewport={false} className="ml-auto hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                Разделы
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-1 p-2">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <a
                          href={item.href}
                          className="block rounded-md p-3 leading-snug no-underline transition-colors hover:bg-accent focus:bg-accent"
                        >
                          <div className="text-sm font-medium">{item.label}</div>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                            {item.hint}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <a href="#plan">20 дней</a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <a href="#domain">Домен</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <a
          href="#plan"
          className="ml-auto shrink-0 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 md:ml-0"
        >
          Начать
        </a>
      </div>
    </header>
  );
}
