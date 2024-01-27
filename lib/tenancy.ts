import type { H3Event } from "h3";

export const getTenant = (event: H3Event) => {
    const config = useRuntimeConfig();
    const hostname = getRequestHost(event)

    const rootDomains = (config.public.rootDomains || []) as string[];

    const rootDomain = rootDomains.find((domain) => {
        const idx = hostname.indexOf(domain);
        return idx > -1
    });

    if (!rootDomain) {
        return null
    }

    const idx = hostname.indexOf(rootDomain);
    const tenant = hostname.substring(0, idx - 1);

    return tenant
}