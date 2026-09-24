import axios from "axios";

export function formatError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const request = [error.config?.method?.toUpperCase(), error.config?.url]
      .filter(Boolean)
      .join(" ");
    const status = error.response
      ? `HTTP ${error.response.status}`
      : error.message;
    const data: unknown = error.response?.data;
    const problem =
      data && typeof data === "object"
        ? (data as Record<string, unknown>)
        : null;
    const detail = [problem?.detail, problem?.message, problem?.title].find(
      (value) => typeof value === "string" && value.length > 0,
    );
    const requestId = problem?.requestId;

    const summary = [request, status, detail].filter(Boolean).join(": ");
    return typeof requestId === "string" && requestId
      ? `${summary} (requestId: ${requestId})`
      : summary;
  }

  return error instanceof Error ? error.message : String(error);
}
