"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import ROUTES from "@/constants/routes";
import { updateUser } from "@/lib/actions/user.action";
import { Loader } from "lucide-react";
interface Props {
  user: User;
}

const ProfileForm = ({ user }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });
  const handleUpdateProfile = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({ ...values });
      if (result.success) {
        toast({
          title: "Success",
          description: "Your profile has been updated successfully",
        });
        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast({
          title: `Error (${result.status})`,
          description: result.error?.message,
          variant: "destructive",
        });
      }
    });
  };
  const inputClass =
    "no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateProfile)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Name
                <span className="text-primary-500"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  placeholder="Your Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                User Name
                <span className="text-primary-500"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  placeholder="Your User Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Portfolio
                <span className="text-primary-500"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  type="url"
                  placeholder="Your Portfolio Link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Bio
                <span className="text-primary-500"> *</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className={inputClass}
                  placeholder="Whas' special about you"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Location
                <span className="text-primary-500"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  placeholder="Where do you live"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-7 flex justify-end">
          <Button
            disabled={isPending}
            type="submit"
            className="primary-gradient w-fit"
          >
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
