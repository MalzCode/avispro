import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request, { params }) {
  try {
    const { subdomain } = params;

    if (!subdomain) {
      return NextResponse.json(
        { error: 'Subdomain requis' },
        { status: 400 }
      );
    }

    // Récupérer le profil par username
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', subdomain)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profil non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer les avis approuvés
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
      .eq('profile_id', profile.id)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (reviewsError) {
      return NextResponse.json(
        { error: reviewsError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      profile,
      reviews: reviews || []
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
