import { createQuery } from "@farfetched/core";
import { createLead } from "../api/createLead";

// Отправка заявки: форма берёт $pending, $succeeded, $failed, start, reset
export const createLeadQuery = createQuery({ handler: createLead });
