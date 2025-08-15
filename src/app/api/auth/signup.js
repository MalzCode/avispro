import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { name, business, subdomain, email, password } = await request.json();

    // Vérifier si le sous-domaine est disponible
    const { data: existingUser } = await supabase
      .from('users')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ce nom de domaine est déjà pris' },
        { status: 400 }
      );
    }

    // Créer l'utilisateur dans Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // Créer le profil utilisateur
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        name,
        business,
        subdomain,
        email,
        plan: 'gratuit',
        created_at: new Date().toISOString(),
      });

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Compte créé avec succès',
      user: {
        id: authUser.user.id,
        email,
        subdomain,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
