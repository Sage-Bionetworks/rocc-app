interface IdMap {
  tmpId: string;
  id: string;
}

export interface DocumentsCreateResult<T> {
  documents: T[];
  idMaps: IdMap[];
}
