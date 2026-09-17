import registry from "../registry.json" with { type: "json" };

type RegistryItem = (typeof registry.items)[number];

export function registryItem(name: string): RegistryItem | undefined {
  return registry.items.find((item) => item.name === name);
}

export function registryTitle(name: string, fallback?: string) {
  return registryItem(name)?.title ?? fallback ?? name;
}

export function registryDescription(name: string) {
  return registryItem(name)?.description ?? "";
}

export function docNavFromRegistry(
  to: string,
  registryName: string,
  title?: string,
) {
  const item = registryItem(registryName);
  return {
    to,
    name: title ?? item?.title ?? registryName,
    description: item?.description ?? "",
  };
}
