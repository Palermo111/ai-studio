export interface ProviderRequest<TPayload = unknown> {
  provider: string;
  endpoint: string;
  payload: TPayload;
}