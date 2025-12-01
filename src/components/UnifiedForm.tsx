import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm as useFormspree } from "@formspree/react";
import { toast } from "sonner";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to get flag emoji from country code
function getFlagEmoji(countryCode: string) {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Custom Country Select Component
const CountrySelect = ({ value, onChange, labels, priorityCountries }: any) => {
  const countries = getCountries();
  const otherCountries = countries.filter((c) => !priorityCountries.includes(c));
  const sortedCountries = [...priorityCountries, ...otherCountries];

  const selectedCountry = value || priorityCountries[0];
  const selectedCallingCode = getCountryCallingCode(selectedCountry);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[110px] bg-background/50 flex items-center gap-2 px-3">
        {/* Trigger shows Flag + Code */}
        <span className="text-lg leading-none">{getFlagEmoji(selectedCountry)}</span>
        <span className="text-sm text-muted-foreground">+{selectedCallingCode}</span>
      </SelectTrigger>
      <SelectContent className="max-h-[300px] w-[300px]">
        {sortedCountries.map((country) => (
          <SelectItem key={country} value={country}>
            <span className="mr-2 text-lg">
              {getFlagEmoji(country)}
            </span>
            {labels[country]} <span className="text-muted-foreground ml-1">(+{getCountryCallingCode(country)})</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Define the schema for the form
const formSchema = z.object({
  mode: z.enum(["job", "enquiry"]),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  country: z.string().min(1, {
    message: "Please select a country.",
  }),
  mobile: z.string().optional(),
  role: z.string().optional(),
  portfolio: z.string().optional(),
  resume: z.any().optional(),
  cover: z.string().optional(),
  enquiry_type: z.enum(["money", "idea", "general"]).optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UnifiedFormProps {
  mode: "job" | "enquiry";
  defaultRole?: string;
  defaultService?: string;
  defaultEnquiryType?: "money" | "idea" | "general";
  hideEnquiryType?: boolean;
  onSuccess?: () => void;
  className?: string;
}

export function UnifiedForm({
  mode,
  defaultRole,
  defaultService,
  defaultEnquiryType,
  hideEnquiryType = false,
  onSuccess,
  className,
}: UnifiedFormProps) {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || "xzzllqzv";
  const [state, handleSubmit] = useFormspree(formId);

  const defaultCountry = mode === "enquiry" ? "US" : "IN";
  const priorityCountries = mode === "enquiry" ? ["US", "IN"] : ["IN", "US"];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: mode,
      name: "",
      email: "",
      country: defaultCountry,
      mobile: "",
      role: defaultRole || "",
      portfolio: "",
      cover: "",
      enquiry_type: defaultEnquiryType || (hideEnquiryType ? "general" : undefined),
      message: defaultService ? `I am interested in ${defaultService}...` : "",
    },
  });

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Sent successfully!", {
        description: "We'll get back to you soon.",
      });
      form.reset();
      if (onSuccess) onSuccess();
    }
    if (state.errors) {
      toast.error("Something went wrong.", {
        description: "Please try again.",
      });
    }
  }, [state.succeeded, state.errors, onSuccess, form]);

  const onSubmit = (data: FormValues) => {
    const payload: Record<string, unknown> = { ...data };
    try {
      const callingCode = getCountryCallingCode(data.country as any);
      payload.mobile = `+${callingCode} ${data.mobile}`;
    } catch (e) {
      // keep original if error
    }

    if (mode === "job" && data.resume && data.resume.length > 0) {
      payload.resume = data.resume[0];
    }

    handleSubmit(payload as any);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <input type="hidden" {...form.register("mode")} value={mode} />

        {mode === "enquiry" && defaultService && (
          <div className="space-y-2">
            <FormLabel>Service Interest</FormLabel>
            <Input value={defaultService} readOnly className="bg-background/50 opacity-70" />
          </div>
        )}

        {mode === "enquiry" && !hideEnquiryType && (
          <FormField
            control={form.control}
            name="enquiry_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enquiry Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="money">I have money (Project)</SelectItem>
                    <SelectItem value="idea">I have an idea (Brainstorm)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {mode === "enquiry" && hideEnquiryType && (
          <input type="hidden" {...form.register("enquiry_type")} value="general" />
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="bg-background/50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} className="bg-background/50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Custom Phone Input */}
        <div className="space-y-2">
          <FormLabel>Mobile</FormLabel>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <CountrySelect
                    value={field.value}
                    onChange={field.onChange}
                    labels={en}
                    priorityCountries={priorityCountries}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Mobile Number"
                      {...field}
                      className="bg-background/50"
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {mode === "job" && (
          <>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Interest</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Video Editor" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio URL</FormLabel>
                  <FormControl>
                    <Input placeholder="your-site.com" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Resume (PDF) - Optional</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept=".pdf"
                      className="bg-background/50 cursor-pointer"
                      onChange={(event) => {
                        onChange(event.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're a good fit..."
                      className="bg-background/50 min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {mode === "enquiry" && (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project or idea..."
                    className="bg-background/50 min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full font-bold"
          disabled={state.submitting}
        >
          {state.submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {mode === "job" ? "Submit Application" : "Send Message"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
