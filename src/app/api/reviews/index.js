import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profile_id');
    const status = searchParams.get('status') || 'approved';

    if (!profileId) {
      return NextResponse.json(
        { error: 'profile_id requis' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('profile_id', profileId)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { profile_id, customer_name, customer_email, rating, comment } = await request.json();

    // Validation
    if (!profile_id || !customer_name || !rating || !comment) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'La note doit être entre 1 et 5' },
        { status: 400 }
      );
    }

    const reviewData = {
      profile_id,
      customer_name,
      customer_email: customer_email || null,
      rating,
      comment,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Avis créé avec succès',
      data: data[0] 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}