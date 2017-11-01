const config = [
  {
    title: "Education",
    targetingSpec: {
      interests: ["6003327060545"]
    }
  },
  {
    title: "Culture",
    targetingSpec: {
      interests: ["6003223339834"]
    }
  },
  {
    title: "Corruption and Transparency",
    targetingSpec: {
      interests: ["6003349516151", "6003725505546"]
    }
  },
  {
    title: "Politics and social issues",
    targetingSpec: {
      interests: ["6011515350975"]
    }
  },
  {
    title: "Health Care",
    targetingSpec: {
      interests: ["6003464109203"]
    }
  },
  {
    title: "Transport",
    targetingSpec: {
      interests: ["6003260976109", "6003384877565", "6003387449393"]
    }
  }
];

module.exports = function () {
  return function fetchAudience (hook) {
    const accountId = hook.result.id;
    const service = hook.app.service('facebookAudience');
    for(const spec of config) {
      service.create(Object.assign({
        facebookAccountId: accountId
      }, spec));
    }
    return hook;
  }
}
