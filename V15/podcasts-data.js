// Données des podcasts - fichier séparé
const PODCASTS_DATA = [
    {
        id: 1,
        title: "Science et découverte",
        author: "Dr. Martin Dubois",
        description: "Explorez les mystères de l'univers et les dernières avancées scientifiques. Chaque épisode vous emmène dans un voyage fascinant à travers les découvertes qui façonnent notre compréhension du monde.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        audio: "audio/science.mp3",
        category: "Science",
        duration: "24:15"
    },
    {
        id: 2,
        title: "Histoires de voyage",
        author: "Sophie Martin",
        description: "Des récits captivants de voyages aux quatre coins du monde. Découvrez des cultures fascinantes, des paysages à couper le souffle et des aventures incroyables.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        audio: "audio/voyage.mp3",
        category: "Voyage",
        duration: "32:45"
    },
    {
        id: 3,
        title: "Entrepreneuriat 360",
        author: "Thomas Leroy",
        description: "Conseils et stratégies pour développer votre entreprise. Interviews d'entrepreneurs à succès et analyses de cas concrets pour vous inspirer et vous guider.",
        image: "https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        audio: "audio/business.mp3",
        category: "Business",
        duration: "41:20"
    },
    {
        id: 4,
        title: "Culture Pop Actuelle",
        author: "Emma et Lucas",
        description: "L'actualité des séries, films et musique décryptée. Plongez dans l'univers de la culture populaire avec des analyses pertinentes et des débats passionnants.",
        image: "https://images.unsplash.com/photo-1478720568477-b2709ad0b0ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        audio: "audio/culture.mp3",
        category: "Divertissement",
        duration: "55:10"
    },
    {
        id: 5,
        title: "Épanouissement personnel",
        author: "Dr. Isabelle Moreau",
        description: "Des conseils pour améliorer votre bien-être au quotidien. Techniques de développement personnel, mindfulness et stratégies pour une vie plus épanouie.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        audio: "audio/development.mp3",
        category: "Développement personnel",
        duration: "38:30"
    },
    {
        id: 6,
        title: "Les grandes heures de l'Histoire",
        author: "Prof. Jean Lefebvre",
        description: "Revivez les événements marquants de notre histoire. Des récits passionnants qui vous transportent à travers les siècles et les civilisations.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        audio: "audio/history.mp3",
        category: "Histoire",
        duration: "29:55"
    }
];