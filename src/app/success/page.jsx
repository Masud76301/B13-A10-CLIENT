import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiCheckCircle, FiMail, FiBookOpen, FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'
import { subscription } from '@/lib/action/subscription'
import { purchasedRecipe } from '@/lib/action/purchased'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  const {mode} =metadata;
  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    {mode==="payment"?await purchasedRecipe({...metadata,sessionId:session_id}):await subscription({...metadata,sessionId: session_id});}
    
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-default-50/50">
        <div className="max-w-md w-full bg-background border border-default-200 rounded-2xl p-8 text-center shadow-sm">
          {/* Animated Success Icon Badge */}
          <div className="mx-auto my-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400">
            <FiCheckCircle className="h-10 w-10 animate-pulse" />
          </div>

          {/* Heading */}
          {mode==="payment"? <h1 className="text-2xl font-bold tracking-tight text-foreground mt-4">
            Payment Complete
          </h1>:<h1 className="text-2xl font-bold tracking-tight text-foreground mt-4">
            Subscription Confirmed
          </h1>}
         
          <p className="text-default-500 text-sm mt-1">
            You can now create and post unlimited recipes. Let is see what amazing dishes you bring to RecipeRoom.
          </p>

          {/* Recipe Vibe Decorative Separator */}
          <div className="flex items-center justify-center my-6 gap-2">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo1.png" alt="recipe-room Logo" width={30} height={30} />
              <div className="hidden leading-none sm:block">
                <h1 className="text-lg font-bold">
                  RecipeRoom
                </h1>
              </div>
            </Link>
          </div>

          {/* Information Card */}
          <div className="bg-default-100/70 border border-default-200 rounded-xl p-4 text-left space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <FiMail className="h-5 w-5 text-default-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-default-700 leading-relaxed">
                We appreciate your business! A recipe confirmation and digital receipt has been sent to:{' '}
                <strong className="font-semibold text-foreground break-all">{customerEmail}</strong>.
              </p>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col gap-2.5">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <FiBookOpen className="h-4 w-4" />
              Start Cooking Now
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Support Link */}
          <p className="mt-8 text-xs text-default-400">
            Questions about your recipe purchase?{' '}
            <a
              href="mailto:orders@reciperoom.com"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              orders@reciperoom.com
            </a>
          </p>
        </div>
      </div>
    )
  }
}