"use server"

import { getPayload } from "payload";
import config from "@/payload.config";

const payload = await getPayload({ config });


export async function getPageBySlug(slug: string) {
    try {
        const pagesRes = await payload.find({
            collection: "pages",
            limit: 1,
            where: { slug: { equals: slug } },
            depth: 2,
        });

        const page = pagesRes.docs[0];
        return page || null;
    } catch (error) {
        return null;
    }

}