export const translation = {
  common: {
    errorPrefix: 'Erreur :',
    emptyValue: '—',
    rootElementNotFound: 'Root element not found',
  },
  app: {
    title: 'tipee',
    tabs: {
      directory: 'Annuaire',
      statistics: 'Statistiques',
    },
  },
  directory: {
    title: 'Annuaire',
    searchPlaceholder: 'Rechercher un employé…',
    columns: {
      id: 'ID',
      firstName: 'Prénom',
      lastName: 'Nom',
      department: 'Département',
      manager: 'Manager',
    },
    empty: 'Aucun employé trouvé',
  },
  statistics: {
    title: 'Statistiques par département',
    columns: {
      department: 'Département',
      employeeCount: 'Nb employés',
    },
    empty: 'Aucun département',
  },
} as const;
