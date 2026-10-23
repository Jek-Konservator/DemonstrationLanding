import { request } from "@services/request";
import type { Lead } from "../model/schema";

export interface CreateLeadResponse {
  ok: true;
}

export const createLead = async (lead: Lead) => {
  const { data } = await request.post<CreateLeadResponse>("/lead", lead);

  return data;
};
