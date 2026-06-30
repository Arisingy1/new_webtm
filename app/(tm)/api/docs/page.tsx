"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Link2, KeyRound, Lock, ChevronRight, Check, Copy } from "lucide-react";
import { GREEN, TEAL, INK, RED, useReveals } from "@/components/tm/ui";
import { useLocale } from "@/components/tm/LocaleProvider";
import type { Locale } from "@/lib/i18n";

/* ============================================================
   /api/docs — Документация Randvar API (1.0.0).
   Redoc-стиль в фирменной палитре TalentMind: слева навигация,
   по центру описание эндпоинтов, справа тёмные код-панели
   (TypeScript / PHP / Go) и примеры ответов (200 / 400).
   ============================================================ */

const BASE = "https://api.talentmind.ru/v1";
const AMBER = "#E8A317";

/* ---------- типы ---------- */
type SampleVal = string | number | boolean | string[];
type Method = "get" | "post" | "delete";
type Param = { name: string; type: string; def?: string; enums?: string[]; desc: string; required?: boolean };
type Endpoint = {
  id: string; fn: string; method: Method; path: string; summary: string;
  pathParams?: Param[]; pathValues?: Record<string, string>;
  params?: Param[]; body?: Param[]; sample?: Record<string, SampleVal>;
  responses: { code: string; label: string }[];
  res: Record<string, string>;
};
type Group = { id: string; name: string; endpoints: Endpoint[] };
const methodColor = (m: Method) => (m === "get" ? GREEN : m === "post" ? TEAL : AMBER);

/* ---------- данные API ---------- */
const bad = (field: string, msg: string) =>
  `{\n  "success": false,\n  "errors": [\n    ["${field}", "${msg}"]\n  ]\n}`;
const nf = (msg: string) => `{\n  "success": false,\n  "error": "${msg}"\n}`;

const GROUPS: Group[] = [
  {
    id: "interviews", name: "Interviews", endpoints: [
      {
        id: "uploadInterview", fn: "uploadInterview", method: "post", path: "/interviews", summary: "Upload an interview recording for analysis",
        body: [
          { name: "candidate_id", type: "string", required: true, desc: "Candidate identifier" },
          { name: "vacancy_id", type: "string", required: true, desc: "Vacancy identifier" },
          { name: "media_url", type: "string", required: true, desc: "URL of the interview recording (mp4, mp3, m4a)" },
        ],
        sample: { candidate_id: "cand_4f21", vacancy_id: "ui-engineer", media_url: "https://cdn.acme.io/int-204.mp4" },
        responses: [{ code: "200", label: "Interview accepted for processing" }, { code: "400", label: "Bad request" }],
        res: {
          "200": `{\n  "success": true,\n  "id": "int_8d24f0",\n  "status": "processing",\n  "created_at": "2026-06-13T09:24:00Z"\n}`,
          "400": bad("media_url", "Failed to upload the recording"),
        },
      },
      {
        id: "getInterview", fn: "getInterview", method: "get", path: "/interviews/{id}", summary: "Get the status and analysis result of an interview",
        pathParams: [{ name: "id", type: "string", required: true, desc: "Interview identifier" }],
        pathValues: { id: "int_8d24f0" },
        responses: [{ code: "200", label: "Success" }, { code: "404", label: "Interview not found" }],
        res: {
          "200": `{\n  "success": true,\n  "id": "int_8d24f0",\n  "status": "completed",\n  "match": 0.88,\n  "report_url": "https://app.talentmind.app/r/int_8d24f0",\n  "scores": {\n    "leadership": 0.88,\n    "communication": 0.84,\n    "empathy": 0.75,\n    "logic": 0.76\n  }\n}`,
          "404": nf("Interview not found"),
        },
      },
      {
        id: "listInterviews", fn: "listInterviews", method: "get", path: "/interviews", summary: "List interviews",
        params: [
          { name: "status", type: "string", enums: ["processing", "completed", "failed"], desc: "Filter by status" },
          { name: "limit", type: "integer", def: "20", desc: "Number of records. Maximum 100." },
          { name: "offset", type: "integer", def: "0", desc: "Offset for pagination." },
        ],
        sample: { status: "completed", limit: 20, offset: 0 },
        responses: [{ code: "200", label: "Success" }, { code: "400", label: "Bad request" }],
        res: {
          "200": `{\n  "success": true,\n  "total": 128,\n  "items": [\n    { "id": "int_8d24f0", "status": "completed", "match": 0.88 },\n    { "id": "int_7b15c2", "status": "processing", "match": null }\n  ]\n}`,
          "400": bad("limit", "Maximum is 100"),
        },
      },
    ],
  },
  {
    id: "candidates", name: "Candidates", endpoints: [
      {
        id: "getCandidateScore", fn: "getCandidateScore", method: "get", path: "/candidates/{id}/score", summary: "Score a candidate's soft skills",
        pathParams: [{ name: "id", type: "string", required: true, desc: "Candidate identifier" }],
        pathValues: { id: "cand_4f21" },
        responses: [{ code: "200", label: "Success" }, { code: "404", label: "Candidate not found" }],
        res: {
          "200": `{\n  "success": true,\n  "candidate_id": "cand_4f21",\n  "match": 0.88,\n  "scores": {\n    "leadership": 0.88,\n    "communication": 0.84,\n    "empathy": 0.75,\n    "planning": 0.85,\n    "stress_tolerance": 0.68\n  }\n}`,
          "404": nf("Candidate not found"),
        },
      },
      {
        id: "getCandidateReport", fn: "getCandidateReport", method: "get", path: "/candidates/{id}/report", summary: "Full candidate report",
        pathParams: [{ name: "id", type: "string", required: true, desc: "Candidate identifier" }],
        pathValues: { id: "cand_4f21" },
        responses: [{ code: "200", label: "Success" }, { code: "404", label: "Candidate not found" }],
        res: {
          "200": `{\n  "success": true,\n  "candidate": {\n    "name": "Dmitry Sokolov",\n    "position": "Senior Project Manager"\n  },\n  "compatibility": 0.74,\n  "recommendation": "recommended",\n  "strengths": ["Systems thinking", "End-to-end project ownership"],\n  "risks": ["High salary expectations"]\n}`,
          "404": nf("Candidate not found"),
        },
      },
      {
        id: "compareCandidates", fn: "compareCandidates", method: "post", path: "/candidates/compare", summary: "Compare candidates by criteria",
        body: [
          { name: "candidate_ids", type: "array<string>", required: true, desc: "Candidate identifiers (2 to 10)" },
          { name: "criteria", type: "string", desc: "Comparison criterion (for example, leadership)" },
        ],
        sample: { candidate_ids: ["cand_4f21", "cand_9a02"], criteria: "leadership" },
        responses: [{ code: "200", label: "Success" }, { code: "400", label: "Bad request" }],
        res: {
          "200": `{\n  "success": true,\n  "ranking": [\n    { "candidate_id": "cand_4f21", "score": 0.88 },\n    { "candidate_id": "cand_9a02", "score": 0.81 }\n  ]\n}`,
          "400": bad("candidate_ids", "At least 2 candidates required"),
        },
      },
    ],
  },
  {
    id: "culture", name: "Culture", endpoints: [
      {
        id: "getCultureProfile", fn: "getCultureProfile", method: "get", path: "/culture/profile", summary: "Company corporate culture profile",
        responses: [{ code: "200", label: "Success" }],
        res: {
          "200": `{\n  "success": true,\n  "parameters_count": 54,\n  "dimensions": {\n    "innovation": 0.64,\n    "stability": 0.78,\n    "people": 0.72,\n    "results": 0.81,\n    "detail": 0.75,\n    "team": 0.69,\n    "competitiveness": 0.58\n  }\n}`,
        },
      },
      {
        id: "getCultureFit", fn: "getCultureFit", method: "post", path: "/culture/fit", summary: "Assess a candidate's fit with the company DNA",
        body: [{ name: "candidate_id", type: "string", required: true, desc: "Candidate identifier" }],
        sample: { candidate_id: "cand_4f21" },
        responses: [{ code: "200", label: "Success" }, { code: "400", label: "Bad request" }],
        res: {
          "200": `{\n  "success": true,\n  "fit_score": 0.74,\n  "matches": ["Execution discipline", "Analytical approach"],\n  "attention": ["Team collaboration"]\n}`,
          "400": bad("candidate_id", "Candidate not found"),
        },
      },
    ],
  },
  {
    id: "webhooks", name: "Webhooks", endpoints: [
      {
        id: "createWebhook", fn: "createWebhook", method: "post", path: "/webhooks", summary: "Subscribe to analysis events",
        body: [
          { name: "url", type: "string", required: true, desc: "URL for event delivery" },
          { name: "events", type: "array<string>", required: true, desc: "Events: interview.completed, report.ready, candidate.scored" },
        ],
        sample: { url: "https://acme.io/hooks/talentmind", events: ["interview.completed", "report.ready"] },
        responses: [{ code: "200", label: "Webhook created" }, { code: "400", label: "Bad request" }],
        res: {
          "200": `{\n  "success": true,\n  "id": "wh_2c91",\n  "url": "https://acme.io/hooks/talentmind",\n  "events": ["interview.completed", "report.ready"]\n}`,
          "400": bad("url", "Invalid URL"),
        },
      },
      {
        id: "listWebhooks", fn: "listWebhooks", method: "get", path: "/webhooks", summary: "List webhooks",
        responses: [{ code: "200", label: "Success" }],
        res: {
          "200": `{\n  "success": true,\n  "items": [\n    {\n      "id": "wh_2c91",\n      "url": "https://acme.io/hooks/talentmind",\n      "events": ["interview.completed", "report.ready"]\n    }\n  ]\n}`,
        },
      },
      {
        id: "deleteWebhook", fn: "deleteWebhook", method: "delete", path: "/webhooks/{id}", summary: "Delete a webhook",
        pathParams: [{ name: "id", type: "string", required: true, desc: "Webhook identifier" }],
        pathValues: { id: "wh_2c91" },
        responses: [{ code: "200", label: "Webhook deleted" }, { code: "404", label: "Webhook not found" }],
        res: {
          "200": `{\n  "success": true,\n  "deleted": true\n}`,
          "404": nf("Webhook not found"),
        },
      },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.endpoints);

/* ============================================================
   Переводы — только проза. Код, JSON и идентификаторы остаются
   на английском. Ключи — стабильные id (группа, эндпоинт,
   имя параметра, код/индекс ответа). EN = текущие строки.
   ============================================================ */
type GroupTx = { name: string; summaries: Record<string, string>; params: Record<string, string>; responses: Record<string, string[]> };
type Tx = { groups: Record<string, GroupTx> };

/* ── UI-словарь статичной обвязки страницы ── */
type UiDict = {
  heroSub: string;
  authTitle: string;
  authDescA: string; // before <code>Authorization</code>
  authDescB: string; // between the two codes
  cardScheme: string;
  cardType: string;
  cardHeader: string;
  pathParameters: string;
  queryParameters: string;
  requestBody: string;
  responses: string;
  required: string;
  defaultPrefix: string;
  enumPrefix: string;
  request: string;
  response: string;
  copy: string;
  copied: string;
};

const UI: Record<Locale, UiDict> = {
  en: {
    heroSub: "TalentMind API documentation — programmatic access to interview analysis, soft skills scoring, and candidate corporate fit assessment. REST API and webhooks for embedding AI assessment into your ATS",
    authTitle: "Authorization",
    authDescA: "The ",
    authDescB: " header is passed in the format ",
    cardScheme: "Scheme",
    cardType: "Type",
    cardHeader: "Header",
    pathParameters: "Path parameters",
    queryParameters: "Query parameters",
    requestBody: "Request body · application/json",
    responses: "Responses",
    required: "required",
    defaultPrefix: "Default: ",
    enumPrefix: "Enum: ",
    request: "Request",
    response: "Response · application/json",
    copy: "Copy",
    copied: "Copied",
  },
  es: {
    heroSub: "Documentación de la API de TalentMind: acceso programático al análisis de entrevistas, la evaluación de habilidades blandas y la valoración de la compatibilidad corporativa de los candidatos. API REST y webhooks para integrar la evaluación con IA en tu ATS",
    authTitle: "Autorización",
    authDescA: "El encabezado ",
    authDescB: " se envía en el formato ",
    cardScheme: "Esquema",
    cardType: "Tipo",
    cardHeader: "Encabezado",
    pathParameters: "Parámetros de ruta",
    queryParameters: "Parámetros de consulta",
    requestBody: "Cuerpo de la solicitud · application/json",
    responses: "Respuestas",
    required: "obligatorio",
    defaultPrefix: "Predeterminado: ",
    enumPrefix: "Enum: ",
    request: "Solicitud",
    response: "Respuesta · application/json",
    copy: "Copiar",
    copied: "Copiado",
  },
  pt: {
    heroSub: "Documentação da API da TalentMind: acesso programático à análise de entrevistas, à avaliação de habilidades comportamentais e à aferição da compatibilidade corporativa dos candidatos. API REST e webhooks para integrar a avaliação com IA ao seu ATS",
    authTitle: "Autorização",
    authDescA: "O cabeçalho ",
    authDescB: " é enviado no formato ",
    cardScheme: "Esquema",
    cardType: "Tipo",
    cardHeader: "Cabeçalho",
    pathParameters: "Parâmetros de caminho",
    queryParameters: "Parâmetros de consulta",
    requestBody: "Corpo da solicitação · application/json",
    responses: "Respostas",
    required: "obrigatório",
    defaultPrefix: "Padrão: ",
    enumPrefix: "Enum: ",
    request: "Solicitação",
    response: "Resposta · application/json",
    copy: "Copiar",
    copied: "Copiado",
  },
  ar: {
    heroSub: "توثيق واجهة TalentMind البرمجية — وصول برمجي إلى تحليل المقابلات وتقييم المهارات الشخصية وقياس مدى ملاءمة المرشّحين للثقافة المؤسسية. واجهة REST وخطافات الويب (webhooks) لدمج التقييم بالذكاء الاصطناعي في نظام تتبّع المتقدّمين لديك",
    authTitle: "المصادقة",
    authDescA: "يُمرَّر ترويسة ",
    authDescB: " بالصيغة ",
    cardScheme: "المخطّط",
    cardType: "النوع",
    cardHeader: "الترويسة",
    pathParameters: "معاملات المسار",
    queryParameters: "معاملات الاستعلام",
    requestBody: "جسم الطلب · application/json",
    responses: "الاستجابات",
    required: "مطلوب",
    defaultPrefix: "الافتراضي: ",
    enumPrefix: "Enum: ",
    request: "الطلب",
    response: "الاستجابة · application/json",
    copy: "نسخ",
    copied: "تم النسخ",
  },
};

const TX: Record<Locale, Tx> = {
  en: {
    groups: {
      interviews: {
        name: "Interviews",
        summaries: {
          uploadInterview: "Upload an interview recording for analysis",
          getInterview: "Get the status and analysis result of an interview",
          listInterviews: "List interviews",
        },
        params: {
          "uploadInterview.candidate_id": "Candidate identifier",
          "uploadInterview.vacancy_id": "Vacancy identifier",
          "uploadInterview.media_url": "URL of the interview recording (mp4, mp3, m4a)",
          "getInterview.id": "Interview identifier",
          "listInterviews.status": "Filter by status",
          "listInterviews.limit": "Number of records. Maximum 100.",
          "listInterviews.offset": "Offset for pagination.",
        },
        responses: {
          uploadInterview: ["Interview accepted for processing", "Bad request"],
          getInterview: ["Success", "Interview not found"],
          listInterviews: ["Success", "Bad request"],
        },
      },
      candidates: {
        name: "Candidates",
        summaries: {
          getCandidateScore: "Score a candidate's soft skills",
          getCandidateReport: "Full candidate report",
          compareCandidates: "Compare candidates by criteria",
        },
        params: {
          "getCandidateScore.id": "Candidate identifier",
          "getCandidateReport.id": "Candidate identifier",
          "compareCandidates.candidate_ids": "Candidate identifiers (2 to 10)",
          "compareCandidates.criteria": "Comparison criterion (for example, leadership)",
        },
        responses: {
          getCandidateScore: ["Success", "Candidate not found"],
          getCandidateReport: ["Success", "Candidate not found"],
          compareCandidates: ["Success", "Bad request"],
        },
      },
      culture: {
        name: "Culture",
        summaries: {
          getCultureProfile: "Company corporate culture profile",
          getCultureFit: "Assess a candidate's fit with the company DNA",
        },
        params: {
          "getCultureFit.candidate_id": "Candidate identifier",
        },
        responses: {
          getCultureProfile: ["Success"],
          getCultureFit: ["Success", "Bad request"],
        },
      },
      webhooks: {
        name: "Webhooks",
        summaries: {
          createWebhook: "Subscribe to analysis events",
          listWebhooks: "List webhooks",
          deleteWebhook: "Delete a webhook",
        },
        params: {
          "createWebhook.url": "URL for event delivery",
          "createWebhook.events": "Events: interview.completed, report.ready, candidate.scored",
          "deleteWebhook.id": "Webhook identifier",
        },
        responses: {
          createWebhook: ["Webhook created", "Bad request"],
          listWebhooks: ["Success"],
          deleteWebhook: ["Webhook deleted", "Webhook not found"],
        },
      },
    },
  },
  es: {
    groups: {
      interviews: {
        name: "Entrevistas",
        summaries: {
          uploadInterview: "Sube una grabación de entrevista para su análisis",
          getInterview: "Obtén el estado y el resultado del análisis de una entrevista",
          listInterviews: "Lista de entrevistas",
        },
        params: {
          "uploadInterview.candidate_id": "Identificador del candidato",
          "uploadInterview.vacancy_id": "Identificador de la vacante",
          "uploadInterview.media_url": "URL de la grabación de la entrevista (mp4, mp3, m4a)",
          "getInterview.id": "Identificador de la entrevista",
          "listInterviews.status": "Filtrar por estado",
          "listInterviews.limit": "Número de registros. Máximo 100.",
          "listInterviews.offset": "Desplazamiento para la paginación.",
        },
        responses: {
          uploadInterview: ["Entrevista aceptada para su procesamiento", "Solicitud incorrecta"],
          getInterview: ["Éxito", "Entrevista no encontrada"],
          listInterviews: ["Éxito", "Solicitud incorrecta"],
        },
      },
      candidates: {
        name: "Candidatos",
        summaries: {
          getCandidateScore: "Evalúa las habilidades blandas de un candidato",
          getCandidateReport: "Informe completo del candidato",
          compareCandidates: "Compara candidatos por criterios",
        },
        params: {
          "getCandidateScore.id": "Identificador del candidato",
          "getCandidateReport.id": "Identificador del candidato",
          "compareCandidates.candidate_ids": "Identificadores de candidatos (de 2 a 10)",
          "compareCandidates.criteria": "Criterio de comparación (por ejemplo, liderazgo)",
        },
        responses: {
          getCandidateScore: ["Éxito", "Candidato no encontrado"],
          getCandidateReport: ["Éxito", "Candidato no encontrado"],
          compareCandidates: ["Éxito", "Solicitud incorrecta"],
        },
      },
      culture: {
        name: "Cultura",
        summaries: {
          getCultureProfile: "Perfil de la cultura corporativa de la empresa",
          getCultureFit: "Evalúa la afinidad de un candidato con el ADN de la empresa",
        },
        params: {
          "getCultureFit.candidate_id": "Identificador del candidato",
        },
        responses: {
          getCultureProfile: ["Éxito"],
          getCultureFit: ["Éxito", "Solicitud incorrecta"],
        },
      },
      webhooks: {
        name: "Webhooks",
        summaries: {
          createWebhook: "Suscríbete a los eventos de análisis",
          listWebhooks: "Lista de webhooks",
          deleteWebhook: "Elimina un webhook",
        },
        params: {
          "createWebhook.url": "URL para la entrega de eventos",
          "createWebhook.events": "Eventos: interview.completed, report.ready, candidate.scored",
          "deleteWebhook.id": "Identificador del webhook",
        },
        responses: {
          createWebhook: ["Webhook creado", "Solicitud incorrecta"],
          listWebhooks: ["Éxito"],
          deleteWebhook: ["Webhook eliminado", "Webhook no encontrado"],
        },
      },
    },
  },
  pt: {
    groups: {
      interviews: {
        name: "Entrevistas",
        summaries: {
          uploadInterview: "Envie uma gravação de entrevista para análise",
          getInterview: "Obtenha o status e o resultado da análise de uma entrevista",
          listInterviews: "Listar entrevistas",
        },
        params: {
          "uploadInterview.candidate_id": "Identificador do candidato",
          "uploadInterview.vacancy_id": "Identificador da vaga",
          "uploadInterview.media_url": "URL da gravação da entrevista (mp4, mp3, m4a)",
          "getInterview.id": "Identificador da entrevista",
          "listInterviews.status": "Filtrar por status",
          "listInterviews.limit": "Número de registros. Máximo 100.",
          "listInterviews.offset": "Deslocamento para a paginação.",
        },
        responses: {
          uploadInterview: ["Entrevista aceita para processamento", "Solicitação inválida"],
          getInterview: ["Sucesso", "Entrevista não encontrada"],
          listInterviews: ["Sucesso", "Solicitação inválida"],
        },
      },
      candidates: {
        name: "Candidatos",
        summaries: {
          getCandidateScore: "Avalie as habilidades comportamentais de um candidato",
          getCandidateReport: "Relatório completo do candidato",
          compareCandidates: "Compare candidatos por critérios",
        },
        params: {
          "getCandidateScore.id": "Identificador do candidato",
          "getCandidateReport.id": "Identificador do candidato",
          "compareCandidates.candidate_ids": "Identificadores de candidatos (de 2 a 10)",
          "compareCandidates.criteria": "Critério de comparação (por exemplo, liderança)",
        },
        responses: {
          getCandidateScore: ["Sucesso", "Candidato não encontrado"],
          getCandidateReport: ["Sucesso", "Candidato não encontrado"],
          compareCandidates: ["Sucesso", "Solicitação inválida"],
        },
      },
      culture: {
        name: "Cultura",
        summaries: {
          getCultureProfile: "Perfil da cultura corporativa da empresa",
          getCultureFit: "Avalie a compatibilidade de um candidato com o DNA da empresa",
        },
        params: {
          "getCultureFit.candidate_id": "Identificador do candidato",
        },
        responses: {
          getCultureProfile: ["Sucesso"],
          getCultureFit: ["Sucesso", "Solicitação inválida"],
        },
      },
      webhooks: {
        name: "Webhooks",
        summaries: {
          createWebhook: "Inscreva-se nos eventos de análise",
          listWebhooks: "Listar webhooks",
          deleteWebhook: "Exclua um webhook",
        },
        params: {
          "createWebhook.url": "URL para a entrega de eventos",
          "createWebhook.events": "Eventos: interview.completed, report.ready, candidate.scored",
          "deleteWebhook.id": "Identificador do webhook",
        },
        responses: {
          createWebhook: ["Webhook criado", "Solicitação inválida"],
          listWebhooks: ["Sucesso"],
          deleteWebhook: ["Webhook excluído", "Webhook não encontrado"],
        },
      },
    },
  },
  ar: {
    groups: {
      interviews: {
        name: "المقابلات",
        summaries: {
          uploadInterview: "ارفع تسجيل مقابلة للتحليل",
          getInterview: "احصل على حالة مقابلة ونتيجة تحليلها",
          listInterviews: "عرض قائمة المقابلات",
        },
        params: {
          "uploadInterview.candidate_id": "معرّف المرشّح",
          "uploadInterview.vacancy_id": "معرّف الوظيفة",
          "uploadInterview.media_url": "رابط تسجيل المقابلة (mp4 أو mp3 أو m4a)",
          "getInterview.id": "معرّف المقابلة",
          "listInterviews.status": "التصفية حسب الحالة",
          "listInterviews.limit": "عدد السجلّات. الحدّ الأقصى 100.",
          "listInterviews.offset": "الإزاحة للتقسيم إلى صفحات.",
        },
        responses: {
          uploadInterview: ["تم قبول المقابلة للمعالجة", "طلب غير صالح"],
          getInterview: ["نجاح", "المقابلة غير موجودة"],
          listInterviews: ["نجاح", "طلب غير صالح"],
        },
      },
      candidates: {
        name: "المرشّحون",
        summaries: {
          getCandidateScore: "قيّم المهارات الشخصية لمرشّح",
          getCandidateReport: "تقرير كامل عن المرشّح",
          compareCandidates: "قارن بين المرشّحين وفق معايير",
        },
        params: {
          "getCandidateScore.id": "معرّف المرشّح",
          "getCandidateReport.id": "معرّف المرشّح",
          "compareCandidates.candidate_ids": "معرّفات المرشّحين (من 2 إلى 10)",
          "compareCandidates.criteria": "معيار المقارنة (مثلًا، القيادة)",
        },
        responses: {
          getCandidateScore: ["نجاح", "المرشّح غير موجود"],
          getCandidateReport: ["نجاح", "المرشّح غير موجود"],
          compareCandidates: ["نجاح", "طلب غير صالح"],
        },
      },
      culture: {
        name: "الثقافة",
        summaries: {
          getCultureProfile: "ملف الثقافة المؤسسية للشركة",
          getCultureFit: "قيّم مدى ملاءمة مرشّح للحمض المؤسسي للشركة",
        },
        params: {
          "getCultureFit.candidate_id": "معرّف المرشّح",
        },
        responses: {
          getCultureProfile: ["نجاح"],
          getCultureFit: ["نجاح", "طلب غير صالح"],
        },
      },
      webhooks: {
        name: "Webhooks",
        summaries: {
          createWebhook: "اشترك في أحداث التحليل",
          listWebhooks: "عرض قائمة الـwebhooks",
          deleteWebhook: "احذف webhook",
        },
        params: {
          "createWebhook.url": "رابط تسليم الأحداث",
          "createWebhook.events": "الأحداث: interview.completed، report.ready، candidate.scored",
          "deleteWebhook.id": "معرّف الـwebhook",
        },
        responses: {
          createWebhook: ["تم إنشاء الـwebhook", "طلب غير صالح"],
          listWebhooks: ["نجاح"],
          deleteWebhook: ["تم حذف الـwebhook", "الـwebhook غير موجود"],
        },
      },
    },
  },
};

/* ── резолверы локализованного текста по стабильным id ── */
const gid = (ep: Endpoint): string => GROUPS.find((g) => g.endpoints.some((e) => e.id === ep.id))!.id;
const txGroupName = (l: Locale, groupId: string) => TX[l].groups[groupId].name;
const txSummary = (l: Locale, ep: Endpoint) => TX[l].groups[gid(ep)].summaries[ep.id];
const txParam = (l: Locale, ep: Endpoint, paramName: string) => TX[l].groups[gid(ep)].params[`${ep.id}.${paramName}`];
const txResponses = (l: Locale, ep: Endpoint) => TX[l].groups[gid(ep)].responses[ep.id];

/* ---------- генераторы кода ---------- */
const resolvePath = (ep: Endpoint) => {
  let p = ep.path;
  if (ep.pathValues) for (const k in ep.pathValues) p = p.replace(`{${k}}`, ep.pathValues[k]);
  return p;
};
const jsVal = (v: SampleVal): string =>
  Array.isArray(v) ? `[${v.map((x) => `'${x}'`).join(", ")}]` : typeof v === "string" ? `'${v}'` : String(v);
const phpVal = (v: SampleVal): string =>
  Array.isArray(v) ? `[${v.map((x) => `'${x}'`).join(", ")}]` : typeof v === "string" ? `'${v}'` : typeof v === "boolean" ? (v ? "true" : "false") : String(v);

function buildTs(ep: Endpoint) {
  const url = BASE + resolvePath(ep);
  const keys = Object.keys(ep.sample ?? {});
  const head = `import axios from 'axios';\n\nasync function ${ep.fn}() {\n  try {`;
  const tail = `\n    console.log(response.data);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n\n${ep.fn}();`;
  if (ep.method === "post") {
    const body = `{\n${keys.map((k) => `      ${k}: ${jsVal(ep.sample![k])}`).join(",\n")}\n    }`;
    return `${head}\n    const response = await axios.post('${url}', ${body}, {\n      headers: { Authorization: 'Bearer YOUR_API_KEY' }\n    });${tail}`;
  }
  const parts = ["      headers: { Authorization: 'Bearer YOUR_API_KEY' }"];
  if (keys.length) parts.push(`      params: {\n${keys.map((k) => `        ${k}: ${jsVal(ep.sample![k])}`).join(",\n")}\n      }`);
  const verb = ep.method === "delete" ? "delete" : "get";
  return `${head}\n    const response = await axios.${verb}('${url}', {\n${parts.join(",\n")}\n    });${tail}`;
}
function buildPhp(ep: Endpoint) {
  const url = BASE + resolvePath(ep);
  const keys = Object.keys(ep.sample ?? {});
  const head = `<?php\nrequire 'vendor/autoload.php';\nuse GuzzleHttp\\Client;\n\n$client = new Client();\n`;
  const authBlock = `    'headers' => [\n        'Authorization' => 'Bearer YOUR_API_KEY',\n    ],`;
  if (ep.method === "post") {
    const j = `, [\n${authBlock}\n    'json' => [\n${keys.map((k) => `        '${k}' => ${phpVal(ep.sample![k])}`).join(",\n")},\n    ],\n]`;
    return `${head}$response = $client->post('${url}'${j});\n\necho $response->getBody();`;
  }
  const opts = keys.length
    ? `, [\n${authBlock}\n    'query' => [\n${keys.map((k) => `        '${k}' => ${phpVal(ep.sample![k])}`).join(",\n")},\n    ],\n]`
    : `, [\n${authBlock}\n]`;
  const verb = ep.method === "delete" ? "delete" : "get";
  return `${head}$response = $client->${verb}('${url}'${opts});\n\necho $response->getBody();`;
}
function buildGo(ep: Endpoint) {
  const keys = Object.keys(ep.sample ?? {});
  const method = ep.method.toUpperCase();
  if (ep.method === "post") {
    const payload = JSON.stringify(ep.sample).replace(/"/g, '\\"');
    return `package main\n\nimport (\n    "bytes"\n    "fmt"\n    "io"\n    "net/http"\n)\n\nfunc main() {\n    payload := []byte("${payload}")\n    req, _ := http.NewRequest("POST", "${BASE + resolvePath(ep)}", bytes.NewBuffer(payload))\n    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")\n    req.Header.Set("Content-Type", "application/json")\n\n    resp, err := http.DefaultClient.Do(req)\n    if err != nil {\n        fmt.Println("Error:", err)\n        return\n    }\n    defer resp.Body.Close()\n\n    body, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}`;
  }
  const qs = keys.length ? "?" + keys.map((k) => `${k}=${ep.sample![k]}`).join("&") : "";
  return `package main\n\nimport (\n    "fmt"\n    "io"\n    "net/http"\n)\n\nfunc main() {\n    req, _ := http.NewRequest("${method}", "${BASE + resolvePath(ep)}${qs}", nil)\n    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")\n\n    resp, err := http.DefaultClient.Do(req)\n    if err != nil {\n        fmt.Println("Error:", err)\n        return\n    }\n    defer resp.Body.Close()\n\n    body, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}`;
}
const buildCode = (ep: Endpoint, lang: Lang) => (lang === "ts" ? buildTs(ep) : lang === "php" ? buildPhp(ep) : buildGo(ep));

/* ---------- подсветка синтаксиса ---------- */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function hlCode(code: string) {
  const re = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\/\/[^\n]*|#[^\n]*)|\b(import|from|const|let|var|async|await|function|return|package|func|require|use|new|echo|try|catch|defer|else|nil|true|false|string)\b|(-?\b\d+(?:\.\d+)?\b)/g;
  let out = "", last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? "ds-str" : m[2] ? "ds-com" : m[3] ? "ds-kw" : "ds-num";
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}
function hlJson(code: string) {
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\b\d+(?:\.\d+)?\b)/g;
  let out = "", last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    if (m[1]) out += `<span class="${m[2] ? "ds-key" : "ds-str"}">${esc(m[1])}</span>` + (m[2] ? esc(m[2]) : "");
    else if (m[3]) out += `<span class="ds-kw">${esc(m[3])}</span>`;
    else out += `<span class="ds-num">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}

type Lang = "ts" | "php" | "go";
const LANGS: [Lang, string][] = [["ts", "TypeScript"], ["php", "PHP"], ["go", "Go"]];

/* ============================================================
   Страница
   ============================================================ */
export default function ApiDocsPage() {
  const root = useReveals();
  const locale = useLocale();
  const ui = UI[locale];
  const [lang, setLang] = useState<Lang>("ts");
  const [active, setActive] = useState(ALL[0].id);

  /* scrollspy — подсветка активного пункта навигации */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ALL.forEach((ep) => { const el = document.getElementById(ep.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div ref={root} className="relative w-full" style={{ color: INK }}>
      <style>{`
        .ds-str{color:#ffd9a0}.ds-key{color:#7ce0d3}.ds-kw{color:#a3e635}.ds-num{color:#f5b971}.ds-com{color:#6b8a7e;font-style:italic}
        .ds-scroll::-webkit-scrollbar{height:8px;width:8px}.ds-scroll::-webkit-scrollbar-thumb{background:#1f4a44;border-radius:8px}
        @keyframes dsPanel{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ============================== HERO ============================== */}
      <section className="mx-auto max-w-[1500px] px-5 pt-32 pb-8 sm:px-8 lg:pt-40 3xl:max-w-[1680px]">
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2 animate-rise" style={{ animationDelay: "60ms" }}>
          <h1 className="text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1] tracking-tight">TalentMind API</h1>
          <span className="mb-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold" style={{ background: `${GREEN}1a`, color: GREEN }}>v1.0.0</span>
        </div>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#183833]/70 animate-rise" style={{ animationDelay: "120ms" }}>
          {ui.heroSub}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3 animate-rise" style={{ animationDelay: "180ms" }}>
          <a href="mailto:support@talentmind.ru" className="ease-smooth inline-flex items-center gap-2 rounded-xl border border-[#183833]/12 bg-white px-4 py-3 text-sm font-medium transition-colors hover:bg-[#f4f7f2]">
            <Mail className="h-4 w-4" style={{ color: TEAL }} /> support@talentmind.ru
          </a>
          <a href="https://talentmind.ru/contacts" className="ease-smooth inline-flex items-center gap-2 rounded-xl border border-[#183833]/12 bg-white px-4 py-3 text-sm font-medium transition-colors hover:bg-[#f4f7f2]">
            <Link2 className="h-4 w-4" style={{ color: TEAL }} /> talentmind.ru/contacts
          </a>
        </div>
      </section>

      {/* ============================== LAYOUT ============================== */}
      <div className="mx-auto max-w-[1500px] px-5 pb-28 sm:px-8 lg:grid lg:grid-cols-[224px_1fr] lg:gap-10 3xl:max-w-[1680px]">
        {/* НАВИГАЦИЯ */}
        <aside className="hidden lg:block">
          <nav className="ds-scroll sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            {GROUPS.map((g) => (
              <div key={g.id} className="mb-6">
                <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#183833]/45">{txGroupName(locale, g.id)}</p>
                <ul className="space-y-0.5">
                  {g.endpoints.map((ep) => {
                    const on = active === ep.id;
                    return (
                      <li key={ep.id}>
                        <a href={`#${ep.id}`} onClick={goTo(ep.id)}
                          className={`ease-smooth flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition-all duration-200 ${on ? "bg-[#f0f6e8] font-semibold" : "text-[#183833]/60 hover:bg-[#f4f7f2] hover:text-[#183833]"}`}
                          style={on ? { color: GREEN } : undefined}>
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all ${on ? "" : "opacity-0"}`} style={{ background: GREEN }} />
                          <span className="truncate">{ep.fn}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* КОНТЕНТ */}
        <main className="min-w-0">
          {/* Authorization */}
          <section className="reveal rounded-3xl border border-[#e6ece4] bg-white p-6 shadow-[0_16px_44px_rgba(24,56,51,0.06)] md:p-8">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: `${TEAL}1a` }}><Lock className="h-5 w-5" style={{ color: TEAL }} /></span>
              <h2 className="text-xl font-bold tracking-tight">{ui.authTitle}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#183833]/70">
              {ui.authDescA}<code dir="ltr" className="rounded bg-[#f4f7f2] px-1.5 py-0.5 font-mono text-[13px]" style={{ color: INK }}>Authorization</code>{ui.authDescB}<code dir="ltr" className="rounded bg-[#f4f7f2] px-1.5 py-0.5 font-mono text-[13px]" style={{ color: GREEN }}>Bearer {"{token}"}</code>
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[[ui.cardScheme, "BearerAuth", <KeyRound key="k" className="h-4 w-4" />], [ui.cardType, "API Key", <Lock key="l" className="h-4 w-4" />], [ui.cardHeader, "Authorization", <ChevronRight key="c" className="h-4 w-4" />]].map(([t, v, icon]) => (
                <div key={t as string} className="rounded-2xl border border-[#eef0ee] bg-[#fafcf8] p-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{icon} {t as string}</p>
                  <p className="mt-1.5 font-mono text-sm font-semibold" style={{ color: INK }}>{v as string}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Группы эндпоинтов */}
          {GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-28">
              <h2 className="reveal mt-14 mb-2 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
                <span className="h-7 w-1.5 rounded-full" style={{ background: GREEN }} /> {txGroupName(locale, g.id)}
              </h2>
              <div className="space-y-2">
                {g.endpoints.map((ep) => <EndpointCard key={ep.id} ep={ep} lang={lang} setLang={setLang} locale={locale} ui={ui} />)}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

/* ---------- карточка эндпоинта ---------- */
function MethodBadge({ method }: { method: Method }) {
  return <span className="rounded-md px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-white" style={{ background: methodColor(method) }}>{method}</span>;
}

function EndpointCard({ ep, lang, setLang, locale, ui }: { ep: Endpoint; lang: Lang; setLang: (l: Lang) => void; locale: Locale; ui: UiDict }) {
  const respLabels = txResponses(locale, ep);
  return (
    <article id={ep.id} className="reveal scroll-mt-28 grid gap-6 border-t border-[#e6ece4] py-10 xl:grid-cols-[1fr_minmax(0,540px)] xl:gap-10">
      {/* ДОКУМЕНТАЦИЯ */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <MethodBadge method={ep.method} />
          <h3 dir="ltr" className="font-mono text-lg font-bold tracking-tight" style={{ color: INK }}>{ep.fn}</h3>
        </div>
        <p className="mt-2.5 text-[15px] leading-relaxed text-[#183833]/70">{txSummary(locale, ep)}</p>

        {ep.pathParams && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#183833]/45">{ui.pathParameters}</p>
            <div className="mt-2 divide-y divide-[#eef0ee] rounded-2xl border border-[#eef0ee] bg-white">
              {ep.pathParams.map((p) => <ParamRow key={p.name} p={p} desc={txParam(locale, ep, p.name)} ui={ui} />)}
            </div>
          </div>
        )}

        {ep.params && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#183833]/45">{ui.queryParameters}</p>
            <div className="mt-2 divide-y divide-[#eef0ee] rounded-2xl border border-[#eef0ee] bg-white">
              {ep.params.map((p) => <ParamRow key={p.name} p={p} desc={txParam(locale, ep, p.name)} ui={ui} />)}
            </div>
          </div>
        )}

        {ep.body && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#183833]/45">{ui.requestBody}</p>
            <div className="mt-2 divide-y divide-[#eef0ee] rounded-2xl border border-[#eef0ee] bg-white">
              {ep.body.map((p) => <ParamRow key={p.name} p={p} desc={txParam(locale, ep, p.name)} ui={ui} />)}
            </div>
          </div>
        )}

        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#183833]/45">{ui.responses}</p>
          <div className="mt-2 space-y-1.5">
            {ep.responses.map((r, i) => (
              <div key={r.code} className="flex items-center gap-2.5 text-sm">
                <span className="rounded-md px-2 py-0.5 font-mono text-xs font-bold text-white" style={{ background: r.code === "200" ? GREEN : RED }}>{r.code}</span>
                <span className="text-[#183833]/70">{respLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div dir="ltr" className="mt-5 flex items-center gap-3 overflow-x-auto rounded-xl border border-[#e6ece4] bg-[#f4f7f2] px-4 py-3">
          <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-wide" style={{ color: methodColor(ep.method) }}>{ep.method}</span>
          <span className="whitespace-nowrap font-mono text-sm" style={{ color: INK }}>/v1{ep.path}</span>
        </div>
      </div>

      {/* КОД */}
      <div className="min-w-0 space-y-4">
        <RequestPanel ep={ep} lang={lang} setLang={setLang} ui={ui} />
        <ResponsePanel ep={ep} ui={ui} />
      </div>
    </article>
  );
}

function ParamRow({ p, desc, ui }: { p: Param; desc: string; ui: UiDict }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 p-3.5 sm:grid-cols-[150px_1fr] sm:gap-4">
      <div>
        <code dir="ltr" className="font-mono text-[13px] font-semibold" style={{ color: INK }}>{p.name}</code>
        {p.required && <span className="ml-1.5 align-middle text-[10px] font-semibold uppercase" style={{ color: RED }}>{ui.required}</span>}
        <p dir="ltr" className="mt-0.5 font-mono text-[11px] text-[#183833]/45">{p.type}</p>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-1.5">
          {p.def != null && <span dir="ltr" className="rounded-md bg-[#f0f6e8] px-2 py-0.5 font-mono text-[11px] font-medium" style={{ color: INK }}>{ui.defaultPrefix}{p.def}</span>}
          {p.enums && <span dir="ltr" className="rounded-md bg-[#eaf6f8] px-2 py-0.5 font-mono text-[11px] font-medium" style={{ color: TEAL }}>{ui.enumPrefix}{p.enums.join(" · ")}</span>}
        </div>
        <p className="mt-1.5 text-[13px] leading-snug text-[#183833]/65">{desc}</p>
      </div>
    </div>
  );
}

/* ---------- панель запроса ---------- */
function RequestPanel({ ep, lang, setLang, ui }: { ep: Endpoint; lang: Lang; setLang: (l: Lang) => void; ui: UiDict }) {
  const code = buildCode(ep, lang);
  return (
    <div className="overflow-hidden rounded-2xl border border-[#13322e] bg-[#0f2a27] shadow-[0_24px_60px_rgba(24,56,51,0.22)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs font-medium text-white/55">{ui.request}</span>
        </div>
        <CopyBtn text={code} ui={ui} />
      </div>
      <div className="flex gap-1 border-b border-white/10 px-3 py-2">
        {LANGS.map(([id, label]) => (
          <button key={id} onClick={() => setLang(id)}
            className={`ease-smooth rounded-lg px-3 py-1 text-xs font-medium transition-all duration-200 ${lang === id ? "bg-white/12 text-white" : "text-white/45 hover:text-white/80"}`}>
            {label}
          </button>
        ))}
      </div>
      <pre key={lang} dir="ltr" className="ds-scroll overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#cfe8c4]" style={{ animation: "dsPanel .3s ease both" }}>
        <code dangerouslySetInnerHTML={{ __html: hlCode(code) }} />
      </pre>
    </div>
  );
}

/* ---------- панель ответа ---------- */
function ResponsePanel({ ep, ui }: { ep: Endpoint; ui: UiDict }) {
  const codes = Object.keys(ep.res);
  const [tab, setTab] = useState(codes[0]);
  const json = ep.res[tab];
  return (
    <div className="overflow-hidden rounded-2xl border border-[#13322e] bg-[#0f2a27] shadow-[0_24px_60px_rgba(24,56,51,0.22)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-xs font-medium text-white/55">{ui.response}</span>
        <CopyBtn text={json} ui={ui} />
      </div>
      <div className="flex gap-1 border-b border-white/10 px-3 py-2">
        {codes.map((c) => (
          <button key={c} onClick={() => setTab(c)}
            className={`ease-smooth flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all duration-200 ${tab === c ? "bg-white/12 text-white" : "text-white/45 hover:text-white/80"}`}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: c === "200" ? GREEN : RED }} /> {c}
          </button>
        ))}
      </div>
      <pre key={tab} dir="ltr" className="ds-scroll overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#cfe8c4]" style={{ animation: "dsPanel .3s ease both" }}>
        <code dangerouslySetInnerHTML={{ __html: hlJson(json) }} />
      </pre>
    </div>
  );
}

/* ---------- кнопка копирования ---------- */
function CopyBtn({ text, ui }: { text: string; ui: UiDict }) {
  const [done, setDone] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(text); setDone(true); clearTimeout(t.current); t.current = setTimeout(() => setDone(false), 1500); }}
      className="ease-smooth flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium text-white/55 transition-all hover:bg-white/10 hover:text-white"
    >
      {done ? <><Check className="h-3.5 w-3.5" style={{ color: GREEN }} /> {ui.copied}</> : <><Copy className="h-3.5 w-3.5" /> {ui.copy}</>}
    </button>
  );
}
