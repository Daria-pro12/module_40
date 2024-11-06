const HistogramsSearch = (inn, tonality, count, startDate, endDate) => {
    const entity = {
        type: "company",
        sparkId: null,
        entityId: null,
        inn,
        maxFullness: true,
        inBusinessNews: null,
    };

    const emptyFilters = {
        and: [],
        or: [],
        not: [],
    };

    const body = {
        issueDateInterval: {
            startDate,
            endDate,
        },
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [entity],
                onlyMainRole: true,
                tonality,
                onlyWithRiskFactors: false,
                riskFactors: emptyFilters,
                themes: emptyFilters,
            },
            themesFilter: emptyFilters,
        },
        searchArea: {
            includedSources: [],
            excludedSources: [],
            includedSourceGroups: [],
            excludedSourceGroups: [],
        },
        attributeFilters: {
            excludeTechNews: true,
            excludeAnnouncements: true,
            excludeDigests: true,
        },
        similarMode: "duplicates",
        limit: count,
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
    };

    return JSON.stringify(body);
};

export { HistogramsSearch };