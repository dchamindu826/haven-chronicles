// src/lib/client.js
import { createClient } from '@sanity/client';

export const client = createClient({
  // ඔයාගේ Project ID එක
  projectId: 'b4iuvnfq', 

  dataset: 'production',
  useCdn: false, 
  apiVersion: '2025-07-16',

  // --- මේක තමයි වැදගත්ම දේ ---
  // ඔයා හදපු 'Editor' permission තියෙන token එක මෙතනට දාන්න
  token: 'sknOzgExPnVmiBcM5Gu9Iog7lGNkuGsbirwsZcrJdhlMDbVs00YXMCEsQ6LUYOPk15PSWEQJf6gBKwn0nwfLQitAi0PnnVQeAHES1qtNFoRVUWtEXQHNtoPo2sjJTILFLJvYVOx5HHs8LP1eV2MVa9XLgYhdco1uNBWOY8kQyMHTk7ergFIh', 
  // -----------------------------
});



