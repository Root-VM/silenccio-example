export type QuestionnaireResponseApiType = {
  id: number,
  name: string,
  organisationData: {
    id: number,
    organisationId: number,
    phone: string,
    street: string,
    houseNumber: string,
    zipCode: string,
    city: string,
    createdAt: string,
    updatedAt: string,
  },
};
