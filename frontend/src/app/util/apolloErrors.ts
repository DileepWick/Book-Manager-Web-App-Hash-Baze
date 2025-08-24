export const getValidationMessages = (err: unknown): string[] => {
  // Treat as any to avoid ApolloError import issues
  const e = err as any;

  if (!e?.graphQLErrors || !Array.isArray(e.graphQLErrors)) {
    return ["An unexpected error occurred"];
  }

  const messages: string[] = [];

  e.graphQLErrors.forEach((error: any) => {
    const originalMessages = error.extensions?.originalError?.message;
    if (originalMessages) {
      if (Array.isArray(originalMessages)) {
        messages.push(...originalMessages);
      } else if (typeof originalMessages === "string") {
        messages.push(originalMessages);
      }
    } else if (error.message) {
      messages.push(error.message);
    }
  });

  return messages;
};
