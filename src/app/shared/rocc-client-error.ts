import { ModelError as RoccClientError } from '@sage-bionetworks/rocc-client-angular';

/* Type guard for RoccClientError. */
export function isRoccClientError(error: any): error is RoccClientError {
  const err = error as RoccClientError;
  return err.status !== undefined && err.title !== undefined;
}
