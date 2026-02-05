import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tradescalpsnip';

async function resetDatabase() {
  console.log('🔄 Connexion à MongoDB...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB');
    
    const db = mongoose.connection.db;
    
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    // Lister toutes les collections
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('ℹ️  Aucune collection à supprimer. Base de données déjà vide.');
    } else {
      console.log(`\n📋 Collections trouvées: ${collections.map(c => c.name).join(', ')}\n`);
      
      // Supprimer chaque collection
      for (const collection of collections) {
        await db.dropCollection(collection.name);
        console.log(`🗑️  Collection "${collection.name}" supprimée`);
      }
      
      console.log('\n✅ Toutes les collections ont été supprimées!');
    }
    
    // Statistiques
    const stats = await db.stats();
    console.log(`\n📊 Statistiques de la base de données:`);
    console.log(`   - Nom: ${stats.db}`);
    console.log(`   - Collections: ${stats.collections}`);
    console.log(`   - Documents: ${stats.objects}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Déconnecté de MongoDB');
    process.exit(0);
  }
}

// Exécuter
resetDatabase();
